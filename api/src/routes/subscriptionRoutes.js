import { Router } from 'express';

import PrismaService from '../services/PrismaService.js';
import StripeService from '../services/StripeService.js';
import SubscriptionService from '../services/SubscriptionService.js';
import sendResponse from '../utils/sendResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = Router();

export default (app) => {
    app.use('/subscriptions', router);

    // Create a subscription
    router.post('/', asyncHandler(async (req, res) => {
        // FIXME: Make sure there is no active subscription for this domain
        const newSubscription = await SubscriptionService.create(req.body)
        return sendResponse(res, newSubscription);
    }));

    // Delete a subscription
    router.delete('/:id', asyncHandler(async (req, res) => {
        const { id } = req.params;
        const deletedSubscription = await PrismaService.delete('subscription', id);
        return sendResponse(res, deletedSubscription);
    }));

    // Create Stripe Checkout Session
    router.post('/create-checkout-session', asyncHandler(async (req, res) => {
        const checkoutSession = await StripeService.createCheckoutSession(req.body);
        return sendResponse(res, checkoutSession);
    }));

    // Listen for Stripe Webhooks
    router.post('/webhook', asyncHandler(async (req, res) => {
        // Verify the Webhook first
        const stripeEvent = StripeService.constructEvent(req.body, signature, STRIPE_WEBHOOK_SECRET);
        // Handle the sent Event second
        const data = await StripeService.handleEvent(stripeEvent);
        return sendResponse(res, data);
    }));
}