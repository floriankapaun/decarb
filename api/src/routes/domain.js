import { Router } from 'express';
import PrismaService from '../services/prisma.js';

const router = Router();

export default (app) => {
    app.use('/domains', router);

    // Create a new domain
    router.post('/', async (req, res) => {
        const domainData = req.body;
        const newDomain = await PrismaService.create('domain', domainData);
        return res.json(newDomain).status(200);
    });

    // Get all domains
    router.get('/', async (req, res) => {
        const allDomains = await PrismaService.findMany('domain');
        return res.json(allDomains);
    });

    // Get a domain
    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        const uniqueDomain = await PrismaService.findUnique('domain', id);
        res.json(uniqueDomain).status(200);
    });

    // Update a domain
    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        const { companyName } = req.body;
        const updatedDomain = await PrismaService.update('domain', id, { companyName });
        return res.json(updatedDomain).status(200);
    });

    // Delete a domain
    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        const deletedDomain = await PrismaService.delete('domain', id);
        return res.json(deletedDomain).status(200);
    });
};
