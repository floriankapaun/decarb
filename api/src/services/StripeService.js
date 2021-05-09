import stripe from 'stripe';

import { STRIPE_PRICE_ID, STRIPE_SECRET_KEY, STRIPE_SUCCESS_URL, STRIPE_CANCEL_URL } from '../config';
import PrismaService from './PrismaService';

class StripeService {
    constructor() {
        this.stripe = stripe(STRIPE_SECRET_KEY);
    }

    async createCheckoutSession(priceId) {
        const session = await this.stripe.checkout.sessions.create({
            // TODO: Send customer email
            // customer_email: customerEmail,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [ { price: priceId } ],
            // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
            // the actual Session ID is returned in the query parameter when your customer
            // is redirected to the success page.
            success_url: `${STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: STRIPE_CANCEL_URL,
        });
        console.log(session);
        return session.id;
    }

    // async createCustomer (subscriptionId, email) {
    //     // Create Stripe Customer
    //     const customer = await this.stripe.customers.create({ email });
    //     // Save Customer ID to Stripe Subscription
    //     const data = { stripeCustomerId: customer.id };
    //     const updatedSubscription = await PrismaService.update('subscription', subscriptionId, data);
    //     return updatedSubscription;
    // }

    // async createSubscription(paymentInterval) {
    //     // TODO: Requires some upfront stuff...
    //     // Create the subscription
    //     const subscription = await this.stripe.subscriptions.create({
    //         customer: req.body.customerId,
    //         items: [{ price: STRIPE_PRICE_ID[paymentInterval] }],
    //         // expand: ['latest_invoice.payment_intent', 'pending_setup_intent']
    //     });
    //     return subscription;
    // }
}

export default new StripeService();
