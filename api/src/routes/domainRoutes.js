import { Router } from 'express';

import attachCurrentUser from '../middlewares/attachCurrentUser';
import isAuth from '../middlewares/isAuth';
import requireDomainRole from '../middlewares/requireDomainRole.js';
import PrismaService from '../services/PrismaService.js';
import DomainService from '../services/DomainService.js';
import asyncHandler from '../utils/asyncHandler';
import sendResponse from '../utils/sendResponse';
import { DOMAIN_PAGES_RESPONSE_LIMIT } from '../config';

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
        const updatedDomain = await PrismaService.update('domain', id, req.body);
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

    // Get a domain profile by url
    router.get('/:url/profile', asyncHandler(async (req, res) => {
        const { url } = req.params;
        const domainProfile = await DomainService.getDomainProfile(url);
        return sendResponse(res, domainProfile);
    }));

    /**
     * Domain -> DomainHostingEmission Routes
     */

    // Get a domains current DomainHostingEmissions
    router.get(
        '/:id/hosting-emissions',
        isAuth,
        attachCurrentUser,
        requireDomainRole(),
        asyncHandler(async (req, res) => {
            const { id } = req.params;
            const domainHostingEmission = await DomainService.getCurrentHostingEmission(id);
            return sendResponse(res, domainHostingEmission);
        })
    );


    /**
     * Domain -> Page Routes
     */

    // Get a domain and all of its pages
    router.get(
        '/:id/pages',
        isAuth,
        attachCurrentUser,
        requireDomainRole(),
        asyncHandler(async (req, res) => {
            const { id } = req.params;
            // Include pages, but only their 'url' and 'createdAt'
            const options = {
                include: {
                    pages: {
                        select: {
                            url: true,
                            createdAt: true,
                        },
                        take: DOMAIN_PAGES_RESPONSE_LIMIT,
                    }
                }
            };
            const uniqueDomain = await PrismaService.findUnique('domain', { id }, options);
            return sendResponse(res, uniqueDomain);
        })
    );

    // Get a domains pages current pageViewEmissions sorted by emissionAmount
    router.get(
        '/:id/pages/emissions',
        isAuth,
        attachCurrentUser,
        requireDomainRole(),
        asyncHandler(async (req, res) => {
            const { id } = req.params;
            const { itemLimit, itemOffset } = req.body;
            const pageViewEmissions = await DomainService.getCurrentPageViewEmissions(
                id, itemLimit, itemOffset
            );
            return sendResponse(res, pageViewEmissions);
        })
    );

    /**
     * Domain -> PageView Routes
     */

    // Get PageViews for each Page of a Domain (in time range)
    router.get(
        '/:id/pageviews',
        isAuth,
        attachCurrentUser,
        requireDomainRole(),
        asyncHandler(async (req, res) => {
            const { id } = req.params;
            // TODO: Validate Data Inputs (for whole document). Check out Prismas built-in escaping: https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#sql-injection
            const { timeStart, timeEnd, itemLimit, itemOffset } = req.body;
            const pageViews = await DomainService.getPageViews(
                id, timeStart, timeEnd, itemLimit, itemOffset
            );
            return sendResponse(res, pageViews);
        })
    );

    // Get a domains cummulated pageviews (in time range)
    router.get(
        '/:id/aggregated-pageviews',
        isAuth,
        attachCurrentUser,
        requireDomainRole(),
        asyncHandler(async (req, res) => {
            const { id } = req.params;
            const { timeStart, timeEnd } = req.body;
            const pageViews = await DomainService.getAggregatedPageViews(
                id, timeStart, timeEnd
            );
            return sendResponse(res, pageViews);
        })
    );

    // Get a domains cummulated pageviews per day (in time range)
    router.get(
        '/:id/pageviews/day',
        isAuth,
        attachCurrentUser,
        requireDomainRole(),
        asyncHandler(async (req, res) => {
            const { id } = req.params;
            const { timeStart, timeEnd } = req.body;
            const pageViews = await DomainService.getAggregatedDailyPageViews(
                id, timeStart, timeEnd
            );
            return sendResponse(res, pageViews);
        })
    );

    /**
     * Domain -> Emission Routes
     */

    // Get a domains aggregated pageViewEmissions (in time range)
    router.get('/:id/emissions',
        isAuth,
        attachCurrentUser,
        requireDomainRole(),
        asyncHandler(async (req, res) => {
            const { id } = req.params;
            const { timeStart, timeEnd } = req.body;
            const domainEmissions = await DomainService.getAggregatedEmissions(id, timeStart, timeEnd);
            return sendResponse(res, domainEmissions);
        })
    );


    /**
     * Domain -> Offset Routes
     */

    // Get cummulated data of Domains purchased Offsets
    router.get(
        '/:id/offsets/purchased',
        isAuth,
        attachCurrentUser,
        requireDomainRole(),
        asyncHandler(async (req, res) => {
            const { id } = req.params;
            const purchasedOffsets = await DomainService.getAggregatedOffsets(id);
            return sendResponse(res, purchasedOffsets);
        })
    );
};
