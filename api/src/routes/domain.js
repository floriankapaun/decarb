import { Router } from 'express';
import PrismaService from '../services/prisma.js';

const router = Router();

export default (app) => {
    app.use('/domains', router);

    // Get all domains
    router.get('/', async (req, res) => {
        const allDomains = await PrismaService.findMany('domain');
        return res.json(allDomains);
    });

    // Get a specific domain
    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        const uniqueDomain = await PrismaService.findUnique('domain', id);
        res.json(uniqueDomain).status(200);
    });

    // Create a new domain
    router.post('/', async (req, res) => {
        const domainData = req.body;
        const newDomain = await PrismaService.create('domain', domainData);
        return res.json(newDomain);
    });
};
