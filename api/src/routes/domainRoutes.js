import { Router } from 'express';

import attachCurrentUser from '../middlewares/attachCurrentUser.js';
import isAuth from '../middlewares/isAuth.js';
import requireDomainRole from '../middlewares/requireDomainRole.js';
import PrismaService from '../services/PrismaService.js';
import DomainHostingEmissionService from '../services/DomainHostingEmissionService.js';
import DomainService from '../services/DomainService.js';
import EmissionService from '../services/EmissionService.js';
import asyncHandler from '../utils/asyncHandler.js';
import sendResponse from '../utils/sendResponse.js';

const router = Router();

export default (app) => {
    app.use('/domains', router);

    /**
     * Domain routes
     */

    // Create a new Domain
    router.post('/', isAuth, attachCurrentUser, asyncHandler(async (req, res) => {
        const domainData = req.body;
        const newDomain = await DomainService.create(domainData, req.currentUser);
        return sendResponse(res, newDomain);
    }));

    // Get all Domains
    router.get('/', asyncHandler(async (req, res) => {
        const allDomains = await DomainService.getAllPublic();
        return sendResponse(res, allDomains);
    }));

    // NOTE: This route isn't used by the client, but only in dev
    // Get a Domain
    // router.get('/:id', asyncHandler(async (req, res) => {
    //     const { id } = req.params;
    //     // TODO: Move inside DomainService
    //     const uniqueDomain = await PrismaService.findUnique('domain', { id });
    //     return sendResponse(res, uniqueDomain);
    // }));

    // Update a Domain
    router.put(
        '/:id',
        isAuth,
        attachCurrentUser,
        requireDomainRole(0),
        asyncHandler(async (req, res) => {
            const { id } = req.params;
            // TODO: Move inside DomainService and validate given data
            const updatedDomain = await PrismaService.update('domain', id, req.body);
            return sendResponse(res, updatedDomain);
        })
    );

    // NOTE: This route isn't used by the client, but only in dev
    // Delete a Domain
    // router.delete(
    //     '/:id',
    //     isAuth,
    //     attachCurrentUser,
    //     requireDomainRole(0),
    //     asyncHandler(async (req, res) => {
    //         const { id } = req.params;
    //         // TODO: Move inside DomainService
    //         const deletedDomain = await PrismaService.delete('domain', id);
    //         return sendResponse(res, deletedDomain);
    //     })
    // );

    // Verify Domain ownership
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

    // Get a Domains public profile by URL
    router.get('/:url/profile', asyncHandler(async (req, res) => {
        const { url } = req.params;
        const domainProfile = await DomainService.getDomainProfile(url);
        return sendResponse(res, domainProfile);
    }));


    /**
     * Domain -> DomainHostingEmission Routes
     */

    // Get a Domains current DomainHostingEmissions
    router.get(
        '/:id/hosting-emissions',
        isAuth,
        attachCurrentUser,
        requireDomainRole(),
        asyncHandler(async (req, res) => {
            const { id } = req.params;
            const domainHostingEmission = await DomainHostingEmissionService.getCurrent(id);
            return sendResponse(res, domainHostingEmission);
        })
    );


    /**
     * Domain -> Page Routes
     */

    // Get a Domain and all of its Pages
    router.get(
        '/:id/pages',
        isAuth,
        attachCurrentUser,
        requireDomainRole(),
        asyncHandler(async (req, res) => {
            const { id } = req.params;
            const domainAndPages = await DomainService.getIncludingPages(id);
            return sendResponse(res, domainAndPages);
        })
    );

    // Get a Domains Pages current PageViewEmissions sorted by `emissionAmount`
    router.post(
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
    router.post(
        '/:id/views',
        isAuth,
        attachCurrentUser,
        requireDomainRole(),
        asyncHandler(async (req, res) => {
            const { id } = req.params;
            // TODO: Validate Data Inputs (for all routes in this file)
            // Check out Prismas built-in escaping for this:
            // https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#sql-injection
            const { timeStart, timeEnd, itemLimit, itemOffset } = req.body;
            const pageViews = await DomainService.getPageViews(
                id, timeStart, timeEnd, itemLimit, itemOffset
            );
            return sendResponse(res, pageViews);
        })
    );

    // Get a Domains cummulated PageViews (in time range)
    router.post(
        '/:id/aggregated-views',
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

    // Get a Domains cummulated PageViews per day (in time range)
    router.post(
        '/:id/views/day',
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

    // Get an estimation of a Domains monthly emissions
    router.get(
        '/:id/emission-estimation',
        isAuth,
        attachCurrentUser,
        requireDomainRole(0),
        asyncHandler(async (req, res) => {
            const { id } = req.params;
            const estimation = await EmissionService.getInitialEstimation(id);
            return sendResponse(res, estimation);
        })
    );

    // Get a Domains aggregated PageViewEmissions (in time range)
    router.post('/:id/emissions',
        isAuth,
        attachCurrentUser,
        requireDomainRole(),
        asyncHandler(async (req, res) => {
            const { id } = req.params;
            const { timeStart, timeEnd } = req.body;
            const domainEmissions = await EmissionService.getAggregatedEmissions(id, timeStart, timeEnd);
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
