import { Router } from 'express';

import PrismaService from '../services/PrismaService.js';

const router = Router();

export default (app) => {
    app.use('/domains', router);

    /**
     * Domain routes
     */

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

    /**
     * Domain -> Pages Routes
     */

    // Get a domain and all of its pages
    router.get('/:id/pages', async (req, res) => {
        const { id } = req.params;
        const options = { include: { pages: true } };
        const uniqueDomain = await PrismaService.findUnique('domain', id, options);
        res.json(uniqueDomain).status(200);
    });
};
