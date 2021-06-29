import { Router } from 'express';

import PageViewEmissionService from '../services/PageViewEmissionService.js';
import asyncHandler from '../utils/asyncHandler.js';
import sendResponse from '../utils/sendResponse.js';

const router = Router();

export default (app) => {
    app.use('/sandbox', router);

    // Testing stuff...
    router.post('/', asyncHandler(async (req, res) => {
        const { url, id } = req.body;
        const x = await PageViewEmissionService.create({url, id});
        return sendResponse(res, x);
    }));
}