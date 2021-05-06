import { Router } from 'express';

import SubscriptionService from '../services/SubscriptionService.js';
import PrismaService from '../services/PrismaService.js';
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
}