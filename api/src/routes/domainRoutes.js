import { Router } from 'express';

import attachCurrentUser from '../middlewares/attachCurrentUser';
import isAuth from '../middlewares/isAuth';
import requireDomainRole from '../middlewares/requireDomainRole';
import PrismaService from '../services/PrismaService.js';
import DomainService from '../services/DomainService.js';

const router = Router();

export default (app) => {
    app.use('/domains', router);

    /**
     * Domain routes
     */

    // Create a new domain
    router.post('/', isAuth, attachCurrentUser, async (req, res) => {
        // TODO: Allways wrap async route functions in try/catch statements
        // See: https://www.acuriousanimal.com/blog/2018/03/15/express-async-middleware
        // This one goes into even more detail: https://softwareontheroad.com/error-handling-nodejs/
        const domainData = req.body;
        const newDomain = await DomainService.create(domainData, req.currentUser);
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
        const uniqueDomain = await PrismaService.findUnique('domain', { id });
        res.json(uniqueDomain).status(200);
    });

    // Update a domain
    router.put('/:id', isAuth, attachCurrentUser, requireDomainRole(0), async (req, res) => {
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
        const uniqueDomain = await PrismaService.findUnique('domain', { id }, options);
        res.json(uniqueDomain).status(200);
    });

    /**
     * Domain -> Emission Routes
     */

    // Get a domains aggregated pageViewEmissions
    router.get('/:id/emissions', async (req, res) => {
        const { id } = req.params;
        const domainEmissions = await DomainService.aggregateDomainEmissions(id, '2021-04-01', '2021-04-30');
        res.json(domainEmissions).status(200);
    });
};
