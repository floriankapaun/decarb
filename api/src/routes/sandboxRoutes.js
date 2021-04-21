import { Router } from 'express';

import OffsetService from '../services/OffsetService';
import PrismaService from '../services/PrismaService';

const router = Router();

export default (app) => {
    app.use('/sandbox', router);

    // Create an Offset
    // TODO: Transform into agenda.js job routine
    router.post('/', async (req, res) => {
        const domainId = 'b814324e-801e-462f-8904-9c2b57e52e8a';
        const newOffset = await OffsetService.create(domainId);
        res.json(newOffset).status(200);
    });
}