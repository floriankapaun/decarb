import fetch from 'node-fetch';

import PrismaService from './PrismaService.js';

class PageViewEmissionService {
    async calculate(page) {
        // TODO: Provide own calculations
        const emissions = await fetch(`https://api.websitecarbon.com/site?url=${page.url}`)
            .then(res => res.json())
        console.log('Websitecarbon Emission Calculation: ', emissions);
        const grams = emissions.green ? emissions.statistics.co2.renewable.grams : emissions.statistics.co2.grid.grams;
        const milligramsRounded = Math.round(grams * 1000);
        const pageViewEmissionData = {
            pageId: page.id,
            emissionAmount: milligramsRounded,
            fileSize: emissions.bytes,
            internalRequests: 0,
            externalRequests: 0,
        };
        const newPageViewEmission = await PrismaService.create('pageViewEmission', pageViewEmissionData);
        return await newPageViewEmission;
    }

    async initialCalculations(domainId) {
        const options = { include: { pages: true } };
        const domainPages = await PrismaService.findMany('page', domainId, options);
        // TODO: Only calculate pageViewEmissions for max 100 random pages
        // const newPageViewEmissions = [];
        for (const page of domainPages) {
            await this.calculate(page);
        }

        return 'Awaiting initialCalculations to finish';
    }
};

export default new PageViewEmissionService();