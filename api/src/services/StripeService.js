import stripe from 'stripe';

import { 
    STRIPE_PORTAL_RETURN_URL,
    STRIPE_SECRET_KEY,
    STRIPE_SUCCESS_URL,
    STRIPE_CANCEL_URL,
    STRIPE_WEBHOOK_SECRET,
    ENUMS,
    EVENTS,
    STRIPE_PRICE_ID,
    STRIPE_CHECKOUT_SESSION_MODE,
    STRIPE_PAYMENT_METHODS,
} from '../config/index.js';
import AppError from '../utils/AppError.js';
import EventEmitter from '../utils/eventEmitter.js';
import OffsetService from './OffsetService.js';
import SubscriptionService from './SubscriptionService.js';


/**
 * Handles Stripe
 */
class StripeService {
    constructor() {
        this.stripe = stripe(STRIPE_SECRET_KEY);
    }

    /**
     * Creates a Checkout Session for the user and returns a checkout ID
     * which the client can then use to redirect the user to the created
     * session.
     * 
     * @param {Object} data 
     * @param {String} [data.subscriptionId] - Local Subscription ID
     * @param {String} [data.email] - Customer E-Mail
     * @param {String} [data.priceId] - 'price_...'
     * @returns {String} - Stripe Checkout Session ID
     */
    async createCheckoutSession(data) {
        if (!data.subscriptionId) {
            throw new AppError('"subscriptionId" required', 400);
        }
        if (!data.email) {
            throw new AppError('"email" required', 400);
        }
        if (!data.priceId) {
            throw new AppError('"priceId" required', 400);
        }
        if (
            data.priceId !== STRIPE_PRICE_ID[ENUMS.paymentInterval[0]] &&
            data.priceId !== STRIPE_PRICE_ID[ENUMS.paymentInterval[1]]
        ) {
            throw new AppError(`priceId "${priceId}" is invalid.`, 400);
        }
        const session = await this.stripe.checkout.sessions.create({
            client_reference_id: data.subscriptionId,
            customer_email: data.email,
            mode: STRIPE_CHECKOUT_SESSION_MODE,
            payment_method_types: STRIPE_PAYMENT_METHODS,
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
     * Creates a Customer Portal Session for a user and returns a Session
     * URL which the client can then use to redirect the user to the created
     * session.
     * 
     * @param {Object} req 
     * @returns {String} - Customer Portal Session URL
     */
    async createCustomerPortalSession(req) {
        if (!req.body.domainId) {
            throw new AppError('Missing domainId', 400);
        }
        const subscription = await SubscriptionService.getByDomainId(req.body.domainId);
        if (!subscription.stripeCustomerId) {
            throw new AppError(`No Stripe Customer for Subscription: ${subscription.id}`, 404);
        }
        const session = await this.stripe.billingPortal.sessions.create({
            customer: subscription.stripeCustomerId,
            return_url: STRIPE_PORTAL_RETURN_URL,
        })
        return session.url;
    }


    /**
     * Creates a Stripe Webhook Event and verifies the Webhook Signature
     * 
     * @param {Object} req 
     * @returns {Object} - Stripe Event
     */
    createEvent(req) {
        if (!STRIPE_WEBHOOK_SECRET) {
            throw new AppError('Missing Stripe Webhook Secret', 403);
        }
        const signature = req.headers['stripe-signature'];
        try {
            // Retrieve the event by verifying the signature using the raw body and secret.
            const stripeEvent = this.stripe.webhooks.constructEvent(
                req.rawBody, signature, STRIPE_WEBHOOK_SECRET
            );
            return stripeEvent;
        } catch (err) {
            // CHECK: Why not throw the Stripe Error itself? (This is from their sample code...)
            throw new AppError('⚠️  Webhook signature verification failed.', 403);
        }
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
            throw new AppError(
                `Failed to record usage (${offsetKilograms} kg) to Stripe for "${stripeSubscriptionItemId}"`,
                500
            );
        }
        if (usage.statusCode && !usage.statusCode.toString().startsWith('2')) {
            throw new AppError(
                `${usage.code}: ${usage.raw.message}`,
                usage.statusCode
            );
        }
        return usage;
    }

    
    /**
     * Handle Stripe 'checkout.session.completed' Webhook Event
     * 
     * @param {Object} object - Stripe event data
     * @returns {String} - status 
     */
    async handleCheckoutSessionCompleted(object) {
        // Payment is successful and the subscription is created.
        // You should provision the subscription and save the customer ID to your database.
        const subscriptionId = object?.client_reference_id;
        const subscription = await SubscriptionService.get(subscriptionId);
        const stripeSubscription = await this.getSubscription(object?.subscription);
        const updatedSubscriptionData = {
            stripeCustomerId: object?.customer,
            stripeSubscriptionId: object?.subscription,
            stripeSubscriptionItemId: stripeSubscription?.items?.data?.[0]?.id,
        };
        const currency = object?.currency.toUpperCase();
        if (ENUMS.currency.includes(currency)) {
            updatedSubscriptionData.currency = currency;
        } else {
            // Don't throw because its not important
            console.error(`Unknown currency ${currency}`);
        }
        const updatedSubscription = await SubscriptionService.update(
            subscription.id,
            updatedSubscriptionData
        );
        EventEmitter.emit(EVENTS.start.subscription, updatedSubscription);
        return 'done';
    }


    /**
     * Handle Stripe 'invoice.created' Webhook Event
     * 
     * If an Invoice is created by Stripe, update the current Offset, buy the Offsets
     * from Ecologi and report usage to Stripe so they can move that Invoice from draft
     * to open with the correct invoice amount.
     * 
     * @param {Object} object - Stripe event data
     * @returns {String} - status 
     */
    async handleInvoiceCreated(object) {
        // Get subscription item id
        const subscription = await SubscriptionService.getByStripeSubscriptionId(object?.subscription);
        if (!subscription?.id) return 'abort';
        // Get current related offset and make sure it is up to date
        const currentOffset = await OffsetService.recalculateCurrent(
            subscription.domainId,
            subscription.id
        );
        // Purchase offsets
        const updatedOffset = await OffsetService.makePurchase(currentOffset);
        // Validate amount of emission kilograms to record
        const validatedEmissionKilograms = await OffsetService.validateRecordAmount(updatedOffset);
        // Record usage to Stripe
        const usageReport = await this.recordUsage(
            subscription.stripeSubscriptionItemId,
            validatedEmissionKilograms
        );
        console.info(
            `💁 Recorded ${validatedEmissionKilograms} kg usage to ${subscriptionItemId}`,
            usageReport
        );
        return 'done';
    }

    async handleEvent(stripeEvent) {
        const { data } = stripeEvent;
        console.info('🍿 STRIPE EVENT', stripeEvent.type);
        let response;
        switch (stripeEvent.type) {
            case 'checkout.session.completed':
                response = await this.handleCheckoutSessionCompleted(data?.object);
                break;
            case 'invoice.created':
                if (data?.object?.billing_reason === 'subscription_create') break;
                response = await this.handleInvoiceCreated(data?.object);
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
