import fetch from 'node-fetch';

import {
    MAX_INITIAL_CALCULATIONS,
    PAGESPEED_API_KEY,
    PAGESPEED_STRATEGY,
    PROJECT_SLUG,
} from '../config/index.js';
import AppError from '../utils/AppError.js';
import PrismaService from './PrismaService.js';


/**
 * Controls the 'PageViewEmission' Entity
 * 
 * TODO: Refactor 'PageViewEmission' to 'PageviewEmission'
 */
class PageViewEmissionService {


    /**
     * Returns URL to fetch for Google Pagespeed analysis of specific website
     * 
     * @param {String} url - URL to test
     * @returns {String} - URL to fetch
     */
    setUpPagespeedQuery(url) {
        const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
        const parameters = {
            key: PAGESPEED_API_KEY,
            // To make queries identifiable in analytics tools
            utm_source: PROJECT_SLUG,
            // Run tests as a mobile user because mobile users outweigh the number of desktop users
            strategy: PAGESPEED_STRATEGY,
            url: encodeURIComponent(`https://${url}`),
        };
        let query = `${api}?`;
        for (const key in parameters) {
            query += `${key}=${parameters[key]}&`;
        }
        // Remove last '&'
        query = query.substr(0, query.length - 1)
        return query;
    }


    /**
     * Extracts the amount of transferred bytes from Google Pagespeed Analysis
     * 
     * @param {Object} page - Analyzed Page
     * @param {Object} results - Google Pagespeed Analysis results
     * @returns {Number} - Transferred bytes
     */
    getTransferredBytesFromPagespeedAnalysis(page, results) {
        if (results.error) {
            throw new AppError(
                `Pagespeed Analysis Error: ${page.url}: ${results.error?.message}`,
                500
            );
        }
        const items = results.lighthouseResult?.audits?.['network-requests']?.details?.items;
        if (!items) {
            throw new AppError(
                `Failed to get network-request data from Google Pagespeed for ${page.url}`,
                500
            );
        }
        let aggregatedTransferSize = 0;
        for (const item of items) {
            if (!item.transferSize) continue;
            aggregatedTransferSize += item.transferSize;
        }
        return aggregatedTransferSize;
    }


    /**
     * Creates new PageViewEmission for Page
     * 
     * @param {Object} page - Page object
     * @returns {Object} - Created PageViewEmission object
     */
    async create(page) {
        // Run Google Pagespeed Analysis
        const query = this.setUpPagespeedQuery(page.url);
        try {
            const results = await fetch(query).then((res) => res.json());
            // Compute results
            const transferredBytes = this.getTransferredBytesFromPagespeedAnalysis(page, results);
            // Create PageViewEmission
            const pageViewEmissionData = {
                pageId: page.id,
                byte: transferredBytes,
            };
            const newPageViewEmission = await PrismaService.create('pageViewEmission', pageViewEmissionData);
            if (newPageViewEmission) return newPageViewEmission;
            throw new AppError(`Failed to create PageViewEmission for Page: "${page.id}"`, 500);
        } catch (error) {
            console.error(error);
        }
    }


    /**
     * Tries to find a PageViewEmission entry by page.id. If this fails,
     * the function creates a PageViewEmission entry for the Page.
     * 
     * @param {Object} page - the Page this is referring to
     * @pararm {String} [page.id] - the Pages ID
     * @returns {Object} - database PageViewEmission entry
     */
     async findOrCreate(page) {
        // Try to find most recent PageViewEmission by 'pageId'
        const params = { pageId: page.id };
        const options = { orderBy: { createdAt: 'desc' } };
        const pageViewEmission = await PrismaService.findFirst('pageViewEmission', params, options);
        if (pageViewEmission) return pageViewEmission;
        // If that PageViewEmission isn't existing in database yet, create it.
        const newPageViewEmission = await this.create(page);
        if (newPageViewEmission) return newPageViewEmission;
        throw new AppError(`Failed to register PageViewEmission for Page "${page.id}"`, 500);
    }


    /**
     * Creates PageviewEmissions for the initially created Pages
     * 
     * @param {String} domainId 
     * @returns {String} - Status
     */
    async initialCalculations(domainId) {
        // const options = { include: { pages: true } };
        const domainPages = await PrismaService.findMany('page', { where: { domainId } });
        // const newPageViewEmissions = [];
        // TODO: Randomize the pages that get analyzed if above max values
        for (let i = 0; i < MAX_INITIAL_CALCULATIONS && i < domainPages.length; i++) {
            // OPTIMIZE: Mabye throttle creation to not overcome google api limit
            await this.create(domainPages[i]);
        }
        return 'Awaiting PageviewEmissionService.initialCalculations() to finish';
    }


    /**
     * Returns all current pageViewEmissions for a Domain. If there are none,
     * an empty Array will be returned.
     * 
     * @param {String} domainId - ID of Domain
     * @returns {Array}
     */
    async getAllCurrentForDomain(domainId) {
        const current = await PrismaService.findMany('pageViewEmission', {
            select: {
                byte: true,
            },
            where: {
                page: {
                    domainId: { equals: domainId },
                },
            },
            distinct: ['pageId'],
            orderBy: {
                createdAt: 'desc',
            },
        });
        // Return current even if empty
        return current;
    }
};

export default new PageViewEmissionService();