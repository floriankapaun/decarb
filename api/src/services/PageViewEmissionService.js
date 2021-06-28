import fetch from 'node-fetch';

import AppError from '../utils/AppError.js';
import PrismaService from './PrismaService.js';

class PageViewEmissionService {

    async calculate(page) {
        // TODO: Provide own calculations
        // 1. Hit Pagespeed API
        // 2. Calculate transferred bytes
        // For loop on $results['pagespeedapi']->lighthouseResult->audits->{'network-requests'}->details->items   
        // $item->transferSize
        // 3. Calculate Stats by transferred bytes
        const emissions = await fetch(`https://api.websitecarbon.com/site?url=${page.url}`)
            .then(res => res.json())
        console.log('Websitecarbon Emission Calculation: ', emissions);
        const pageViewEmissionData = {
            pageId: page.id,
            byte: emissions.bytes,
            internalRequests: 0,
            externalRequests: 0,
        };
        const newPageViewEmission = await PrismaService.create('pageViewEmission', pageViewEmissionData);
        if (newPageViewEmission) return newPageViewEmission;
        throw new AppError(`Failed to register new PageViewEmission calculation for Page: "${page.id}"`, 500);
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
        const newPageViewEmission = await this.calculate(page);
        if (newPageViewEmission) return newPageViewEmission;
        throw new AppError(`Couldn't register PageViewEmission for Page "${page.id}"`, 500);
    }

    async initialCalculations(domainId) {
        // const options = { include: { pages: true } };
        const domainPages = await PrismaService.findMany('page', { where: { domainId } });
        // TODO: Only calculate PageViewEmissions for max 100 random pages
        // const newPageViewEmissions = [];
        for (const page of domainPages) {
            await this.calculate(page);
        }

        return 'Awaiting initialCalculations to finish';
    }
};

export default new PageViewEmissionService();