import { Router } from 'express';

import OffsetService from '../services/OffsetService';
import asyncHandler from '../utils/asyncHandler';
import sendResponse from '../utils/sendResponse';

const router = Router();

export default (app) => {
    app.use('/sandbox', router);

    // Create an Offset
    // TODO: Transform into agenda.js job routine
    router.post('/:id', asyncHandler(async (req, res) => {
        const { id } = req.params;
        const newOffset = await OffsetService.create(id);
        return sendResponse(res, newOffset);
    }));
}