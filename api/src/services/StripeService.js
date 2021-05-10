import stripe from 'stripe';

import { STRIPE_PRICE_ID, STRIPE_SECRET_KEY, STRIPE_SUCCESS_URL, STRIPE_CANCEL_URL, STRIPE_WEBHOOK_SECRET } from '../config';
import AppError from '../utils/AppError';
import PrismaService from './PrismaService';

class StripeService {
    constructor() {
        this.stripe = stripe(STRIPE_SECRET_KEY);
    }

    async createCheckoutSession(data) {
        console.log(data.email, data.priceId);
        const session = await this.stripe.checkout.sessions.create({
            client_reference_id: data.domainId,
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
        console.log(session);
        return session.id;
    }

    constructEvent(req) {
        if (!STRIPE_WEBHOOK_SECRET) throw new AppError('Missing Stripe Webhook Secret', 500)
        const signature = req.headers['stripe-signature'];
        try {
            // Retrieve the event by verifying the signature using the raw body and secret.
            const stripeEvent = this.stripe.webhooks.constructEvent(
                req.body, signature, STRIPE_WEBHOOK_SECRET
            );
            return stripeEvent;
        } catch (err) {
            // CHECK: Why not throw the Stripe Error itself? (This is from their sample code...)
            throw new AppError('⚠️  Webhook signature verification failed.')
        }
    }

    async handleEvent(stripeEvent) {
        const { data } = stripeEvent;
        console.log('STR EVENT', stripeEvent.type, data);
        switch (stripeEvent.type) {
            case 'checkout.session.completed':
                // Payment is successful and the subscription is created.
                // You should provision the subscription and save the customer ID to your database.
                const subscriptionId = data.object.client_reference_id;
                const subscription = await PrismaService.findUnique('subscription', { id: subscriptionId });
                if (!subscription) {
                    throw new AppError(`Subscription with ID ${subscriptionId} not found`, 401);
                }
                const updatedSubscriptionData = {
                    currency: data.object.currency.toUpperCase(),
                    stripeCustomerId: data.object.customer,
                    stripeSubscriptionId: data.object.subscription,
                };
                const updatedSubscription = await PrismaService.update('subscription', subscriptionId, updatedSubscriptionData);
                return updatedSubscription;
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
                break;
            default:
                // Unhandled event type
        }
    }
}

export default new StripeService();
