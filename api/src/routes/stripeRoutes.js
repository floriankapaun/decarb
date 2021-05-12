import { Router } from 'express';

import StripeService from '../services/StripeService.js';
import sendResponse from '../utils/sendResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = Router();

export default (app) => {
    app.use('/stripe', router);

    // Create Stripe Checkout Session
    router.post('/create-checkout-session', asyncHandler(async (req, res) => {
        const checkoutSession = await StripeService.createCheckoutSession(req.body);
        return sendResponse(res, checkoutSession);
    }));

    // Listen for Stripe Webhooks
    router.post('/webhooks', asyncHandler(async (req, res) => {
        // Verify the Webhook Signature first
        const stripeEvent = StripeService.constructEvent(req);
        // Handle the sent Event second
        const data = await StripeService.handleEvent(stripeEvent);
        return sendResponse(res, data);
    }));
};