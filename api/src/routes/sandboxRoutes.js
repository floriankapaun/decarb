import { Router } from 'express';
import OffsetService from '../services/OffsetService.js';

import PageViewEmissionService from '../services/PageViewEmissionService.js';
import PrismaService from '../services/PrismaService.js';
import StripeService from '../services/StripeService.js';
import asyncHandler from '../utils/asyncHandler.js';
import sendResponse from '../utils/sendResponse.js';

const router = Router();

export default (app) => {
    app.use('/sandbox', router);

    // Testing stuff...
    router.post('/', asyncHandler(async (req, res) => {
        const { id } = req.body;
        // const offset = await PrismaService.findUnique('offset', { id })
        // const x = await OffsetService.makePurchase(offset);
        const x = await StripeService.recordUsage('si_JlA1iusC2wo31D', 5);
        return sendResponse(res, x);
    }));
}