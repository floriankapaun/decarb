import { Router } from 'express';
import OffsetService from '../services/OffsetService';

const router = Router();

export default (app) => {
    app.use('/sandbox', router);

    // Create an Offset
    router.post('/', async (req, res) => {
        const domainId = 'de66fa3e-8e7f-46c8-81ed-de1787550d13';
        const newOffset = await OffsetService.create(domainId);
        res.json(newOffset).status(200);
    });
}