import { Router } from 'express';
import OffsetService from '../services/OffsetService';

const router = Router();

export default (app) => {
    app.use('/sandbox', router);

    // Create an Offset
    router.post('/', async (req, res) => {
        const domainId = 'c19ae2dd-5374-4638-b4be-eaeb3c73c851';
        const newOffset = await OffsetService.create(domainId);
        res.json(newOffset).status(200);
    });
}