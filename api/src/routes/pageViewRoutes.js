import express from 'express';
import cors from 'cors';

import PageViewService from '../services/PageViewService.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';
import sendResponse from '../utils/sendResponse.js';

const router = express.Router();

export default (app) => {
    app.use('/pageviews', router);

    // Register a pageView
    router.post('/', cors(), express.urlencoded({ extended: false }), asyncHandler(async (req, res) => {
        const origin = req.get('Origin');
        if (!origin) throw new AppError(`No origin provided`, 400);
        const { body } = req;
        const pageView = await PageViewService.create(body, origin);
        return sendResponse(res, pageView);
    }));
}