import { cleanUrl } from '../utils/url.js';
import PrismaService from './PrismaService.js';

class PageViewService {
    isSentFromDomain(pageUrl, requestOrigin) {
       return pageUrl.startsWith(requestOrigin) ? true : false; 
    }

    async create(data, origin) {
        // TODO: Make that function smaller. Move parts out into own functions or other Services.
        const pageUrl = cleanUrl(data.p);
        const requestOrigin = cleanUrl(origin);
        // Make sure the request is sent from the same domain as it is trying
        // to register a pageView on to prevent "external" pageView registrations
        if (!this.isSentFromDomain(pageUrl, requestOrigin)) {
            return `Wrong origin. "${pageUrl}" is sent from "${requestOrigin}".`;
        }
        // Get page info
        let page = await PrismaService.findUnique('page', { url: pageUrl });
        // If that page isn't registered yet, register it
        if (!page) {
            const domain = await PrismaService.findUnique('domain', { url: requestOrigin });
            if (!domain) {
                return `Domain "${requestOrigin}" isn't registered yet.`;
            }
            // Create page
            const pageData = {
                url: pageUrl,
                domainId: domain.id,
            };
            page = await PrismaService.create('page', pageData);
            if (!page) {
                return `Couldn't register page "${pageUrl}".`;
            }
        }
        // Get pageViewEmissions
        const options = { orderBy: { createdAt: 'desc' } };
        const pageViewEmission = await PrismaService.findFirst('pageViewEmission', { pageId: page.id }, options);
        if (!pageViewEmission) {
            // TODO: Fix that problem:
            // pageview emissions probably are created asynchronously (currently they are, but don't knwo about the future). So wait a little bit and then try to run the same function again??? Probabaly no good idea.
            return `The pageViewEmission wasn't created yet, give it another try in a few seconds.`;
        }
        // Register the new pageView
        const pageViewData = {
            pageId: page.id,
            pageViewEmissionId: pageViewEmission.id,
            screenWidth: data.w,
            screenHeight: data.h,
            connectionType: data.c,
        };
        const newPageView = await PrismaService.create('pageView', pageViewData);
        return newPageView;
    }
};

export default new PageViewService();
