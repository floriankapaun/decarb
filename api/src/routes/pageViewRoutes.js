import express from 'express';
import cors from 'cors';

import PageViewService from '../services/PageViewService.js';
import asyncHandler from '../utils/asyncHandler.js';
import sendResponse from '../utils/sendResponse.js';

const router = express.Router();

export default (app) => {
    app.use('/pageviews', router);

    // Register a PageView
    router.post(
        '/',
        cors(),
        express.urlencoded({ extended: false }),
        asyncHandler(async (req, res) => {
            const origin = req.get('Origin');
            const pageView = await PageViewService.register(req.body, origin);
            return sendResponse(res, pageView);
        })
    );
}