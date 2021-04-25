import { Router } from 'express';

import PageViewService from '../services/PageViewService.js';

const router = Router();

export default (app) => {
    app.use('/pageviews', router);

    // Register a pageView
    router.post('/', async (req, res) => {
        const origin = req.get('Origin');
        if (!origin) return res.json(`No origin provided`);
        const { body } = req;
        const pageView = await PageViewService.create(body, origin);
        res.json(pageView).status(200);
    });
}