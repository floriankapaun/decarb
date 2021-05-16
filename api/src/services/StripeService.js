import stripe from 'stripe';

import { 
    STRIPE_PORTAL_RETURN_URL,
    STRIPE_SECRET_KEY,
    STRIPE_SUCCESS_URL,
    STRIPE_CANCEL_URL,
    STRIPE_WEBHOOK_SECRET,
    ENUMS,
    EVENTS,
} from '../config';
import AppError from '../utils/AppError';
import EventEmitter from '../utils/eventEmitter';
import PrismaService from './PrismaService';

class StripeService {
    constructor() {
        this.stripe = stripe(STRIPE_SECRET_KEY);
    }

    async createCheckoutSession(data) {
        const session = await this.stripe.checkout.sessions.create({
            client_reference_id: data.subscriptionId,
            customer_email: data.email,
            mode: 'subscription',
            // https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-payment_method_types
            payment_method_types: ['card'],
            line_items: [ { price: data.priceId } ],
            // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
            // the actual Session ID is returned in the query parameter when your customer
            // is redirected to the success page.
            success_url: `${STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: STRIPE_CANCEL_URL,
        });
        return session.id;
    }

    /**
     * Retrieves a subscription from Stripe
     * 
     * @param {String} id - 'sub_...'
     * @returns 
     */
    async getSubscription(id) {
        return await this.stripe.subscriptions.retrieve(id);
    }

    // TODO: Remove from here... should be in SubscriptionService. I think it's already there as well...
    async getCurrentSubscription(domainId) {
        const params = {
            domainId,
            deletedAt: null,
        };
        const options = {
            orderBy: { createdAt: 'desc' },
        };
        const subscription = await PrismaService.findFirst('subscription', params, options);
        if (!subscription) {
            throw new AppError(`No active Subscription found for Domain: ${req.body.domainId}`, 500);
        }
        return subscription;
    }

    async createPortalSession(req) {
        if (!req.body.domainId) {
            throw new AppError('Missing domainId', 401);
        }
        const subscription = await this.getCurrentSubscription(req.body.domainId);
        if (!subscription.stripeCustomerId) {
            throw new AppError(`No Stripe Customer for Subscription: ${subscription.id}`, 500);
        }
        const session = await this.stripe.billingPortal.sessions.create({
            customer: subscription.stripeCustomerId,
            return_url: STRIPE_PORTAL_RETURN_URL,
        })
        return session.url;
    }

    /**
     * Records usage to a Stripe Subscription. At the end of each subscriptions billing
     * cycle, the user gets billed by the accumulated recorded usage.
     * 
     * @param {String} stripeSubscriptionItemId - 'si_...'
     * @param {Integer} offsetKilograms - Amount of CO2 to Offset in Kilograms
     * @returns 
     */
    async recordUsage(stripeSubscriptionItemId, offsetKilograms) {
        const usage = await this.stripe.subscriptionItems.createUsageRecord(
            stripeSubscriptionItemId,
            {
              quantity: offsetKilograms,
              timestamp: new Date(),
              action: 'increment',
            },
        );
        if (!usage) {
            throw new AppError('Failed to record usage', 500);
        }
        if (usage.statusCode && !usage.statusCode.toString().startsWith('2')) {
            throw new AppError(`${usage.code}: ${usage.raw.message}`, usage.statusCode);
        }
        return usage;
    }

    constructEvent(req) {
        if (!STRIPE_WEBHOOK_SECRET) throw new AppError('Missing Stripe Webhook Secret', 500)
        const signature = req.headers['stripe-signature'];
        try {
            // Retrieve the event by verifying the signature using the raw body and secret.
            const stripeEvent = this.stripe.webhooks.constructEvent(
                req.rawBody, signature, STRIPE_WEBHOOK_SECRET
            );
            return stripeEvent;
        } catch (err) {
            // CHECK: Why not throw the Stripe Error itself? (This is from their sample code...)
            throw new AppError('⚠️  Webhook signature verification failed.')
        }
    }

    async handleEvent(stripeEvent) {
        const { data } = stripeEvent;
        console.log('STRIPE EVENT', stripeEvent.type);
        let response;
        switch (stripeEvent.type) {
            case 'checkout.session.completed':
                // Payment is successful and the subscription is created.
                // You should provision the subscription and save the customer ID to your database.
                const subscriptionId = data.object.client_reference_id;
                const subscription = await PrismaService.findUnique('subscription', { id: subscriptionId });
                if (!subscription) {
                    throw new AppError(`Subscription with ID ${subscriptionId} not found`, 401);
                }
                const stripeSubscription = await this.getSubscription(data.object.subscription);
                const updatedSubscriptionData = {
                    stripeCustomerId: data.object.customer,
                    stripeSubscriptionId: data.object.subscription,
                    stripeSubscriptionItemId: stripeSubscription.items.data[0].id,
                };
                const currency = data.object.currency.toUpperCase();
                if (ENUMS.currency.includes(currency)) {
                    updatedSubscriptionData.currency = currency;
                } else {
                    console.error(`Unknown currency ${currency}`);
                }
                const updatedSubscription = await PrismaService.update('subscription', subscriptionId, updatedSubscriptionData);
                EventEmitter.emit(EVENTS.start.subscription, updatedSubscription);
                response = updatedSubscription;
                break;
            case 'invoice.upcoming':
                // Is sent 3 days prior to renewal
                break;
            case 'invoice.paid':
                // Continue to provision the subscription as payments continue to be made.
                // Store the status in your database and check when a user accesses your service.
                // This approach helps you avoid hitting rate limits.
                break;
            case 'invoice.payment_failed':
                // The payment failed or the customer does not have a valid payment method.
                // The subscription becomes past_due. Notify your customer and send them to the
                // customer portal to update their payment information.
                // TODO: Send Mail to Admin
                break;
            default:
                // Unhandled event type
        }
        return response;
    }
}

export default new StripeService();
