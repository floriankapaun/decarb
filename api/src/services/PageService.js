import AppError from '../utils/AppError';
import { cleanUrl } from '../utils/url';
import PrismaService from './PrismaService';

/**
 * Controls the 'Page' Entity
 */
class PageService {

    /**
     * Tries to find a Page by URL. If this fails, the function creates
     * the Page.
     * 
     * @param {String} url - the Pages URL
     * @returns {Object} - database Page entry
     */
    async findOrCreate(url) {
        const pageUrl = cleanUrl(url);
        // Try to find Page by 'pageUrl'
        const page = await PrismaService.findUnique('page', { url: pageUrl });
        if (page) return page;
        // If that Page isn't existing in database yet, create it.
        // First, find the Domain it belongs to.
        const domainUrl = pageUrl.split('/')[0];
        const domain = await PrismaService.findUnique('domain', { url: domainUrl });
        if (!domain) {
            throw new AppError(`Domain "${domainUrl}" isn't registered yet.`, 400);
        }
        // Then, create the Page
        const pageData = {
            url: pageUrl,
            domainId: domain.id,
        };
        const newPage = await PrismaService.create('page', pageData);
        if (newPage) return newPage;
        throw new AppError(`Couldn't register page "${pageUrl}".`, 500);
    }
}

export default new PageService();