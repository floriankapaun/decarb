import { Router } from 'express';

import attachCurrentUser from '../middlewares/attachCurrentUser';
import isAuth from '../middlewares/isAuth';
import requireDomainRole from '../middlewares/requireDomainRole.js';
import PrismaService from '../services/PrismaService.js';
import DomainService from '../services/DomainService.js';
import asyncHandler from '../utils/asyncHandler';
import sendResponse from '../utils/sendResponse';

const router = Router();

export default (app) => {
    app.use('/domains', router);

    /**
     * Domain routes
     */

    // Create a new domain
    router.post('/', isAuth, attachCurrentUser, asyncHandler(async (req, res) => {
        const domainData = req.body;
        const newDomain = await DomainService.create(domainData, req.currentUser);
        return sendResponse(res, newDomain);
    }));

    // Get all domains
    router.get('/', asyncHandler(async (req, res) => {
        const allDomains = await PrismaService.findMany('domain');
        return sendResponse(res, allDomains);
    }));

    // Get a domain
    router.get('/:id', asyncHandler(async (req, res) => {
        const { id } = req.params;
        const uniqueDomain = await PrismaService.findUnique('domain', { id });
        return sendResponse(res, uniqueDomain);
    }));

    // Update a domain
    router.put('/:id', isAuth, attachCurrentUser, requireDomainRole(0), asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { companyName } = req.body;
        const updatedDomain = await PrismaService.update('domain', id, { companyName });
        return sendResponse(res, updatedDomain);
    }));

    // Delete a domain
    router.delete('/:id', asyncHandler(async (req, res) => {
        const { id } = req.params;
        const deletedDomain = await PrismaService.delete('domain', id);
        return sendResponse(res, deletedDomain);
    }));

    // Verify domain ownership
    router.post(
        '/:id/ownership-verification',
        isAuth,
        attachCurrentUser,
        requireDomainRole(),
        asyncHandler(async (req, res) => {
            const { id } = req.params;
            const verifiedDomain = await DomainService.verifyOwnership(id);
            return sendResponse(res, verifiedDomain);
        })
    );

    /**
     * Domain -> Pages Routes
     */

    // Get a domain and all of its pages
    router.get('/:id/pages', asyncHandler(async (req, res) => {
        const { id } = req.params;
        const options = { include: { pages: true } };
        const uniqueDomain = await PrismaService.findUnique('domain', { id }, options);
        return sendResponse(res, uniqueDomain);
    }));

    /**
     * Domain -> Emission Routes
     */

    // Get a domains aggregated pageViewEmissions
    router.get('/:id/emissions', asyncHandler(async (req, res) => {
        const { id } = req.params;
        const domainEmissions = await DomainService.aggregateDomainEmissions(id, '2021-04-01', '2021-04-30');
        return sendResponse(res, domainEmissions);
    }));
};
