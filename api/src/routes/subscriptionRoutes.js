import { Router } from 'express';

import SubscriptionService from '../services/SubscriptionService.js';
import PrismaService from '../services/PrismaService.js';

const router = Router();

export default (app) => {
    app.use('/subscriptions', router);

    // Create a subscription
    router.post('/', async (req, res) => {
        // FIXME: Make sure there is no active subscription for this domain
        const newSubscription = await SubscriptionService.create(req.body)
        res.json(newSubscription).status(200);
    });

    // Delete a subscription
    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        const deletedSubscription = await PrismaService.delete('subscription', id);
        return res.json(deletedSubscription).status(200);
    });
}