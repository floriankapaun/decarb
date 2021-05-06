import { Router } from 'express';

import OffsetService from '../services/OffsetService';
import asyncHandler from '../utils/asyncHandler';
import sendResponse from '../utils/sendResponse';

const router = Router();

export default (app) => {
    app.use('/sandbox', router);

    // Create an Offset
    // TODO: Transform into agenda.js job routine
    router.post('/', asyncHandler(async (req, res) => {
        const domainId = 'b814324e-801e-462f-8904-9c2b57e52e8a';
        const newOffset = await OffsetService.create(domainId);
        return sendResponse(res, newOffset);
    }));
}