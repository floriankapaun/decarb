import { Router } from 'express';

import SubscriptionService from '../services/SubscriptionService.js';
import sendResponse from '../utils/sendResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = Router();

export default (app) => {
    app.use('/subscriptions', router);

    // Create a subscription
    router.post('/', asyncHandler(async (req, res) => {
        const newSubscription = await SubscriptionService.create(req.body)
        return sendResponse(res, newSubscription);
    }));
};
