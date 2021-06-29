import Sitemapper from 'sitemapper';

import AppError from '../utils/AppError.js';
import { cleanUrl } from '../utils/url.js';
import PrismaService from './PrismaService.js';
import EventEmitter from '../utils/eventEmitter.js';
import { EVENTS } from '../config/index.js';


/**
 * Controls the 'Page' Entity
 */
class PageService {
    constructor() {
        this.sitemapper = new Sitemapper();
    }


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


    /**
     * Fetch sitemap data
     * 
     * @param {String} url - Domain url
     * @returns {Array} - sitemap data
     */
    getPagesFromSitemap(url) {
        return this.sitemapper.fetch(`https://${url}/sitemap.xml`)
            .then(({ sites }) => {
                if (!sites.length) {
                    throw new AppError('⚠️ Sitemap not found, no access granted or empty', 500);
                }
                return sites
            })
            .catch((error) => {
                throw new AppError(error, 500);
            });
    }


    /**
     * Crawls a Domains Sitemap to persist first Page Index to Database.
     *
     * Only used on Domain creation.
     * 
     * @param {Object} domain
     * @returns {Object} - number of pages added to database
     */
    async createInitialIndex(domain) {
        try {
            // Get sitemap data
            const pages = await this.getPagesFromSitemap(domain.url);
            // Create data to persist pages to db
            const newPagesCollection = [];
            for (const page of pages) {
                const cleanPageUrl = cleanUrl(page);
                if (!cleanPageUrl.startsWith(domain.url)) {
                    // Don't throw an Error because it isn't really important to create that
                    // initial index. Just go on and save the one trycatch statement
                    console.error(`⚠️ Page "${page}" is propably no part of "${domain.url}"`);
                    continue;
                }
                // Push Page data to collection
                newPagesCollection.push({
                    url: cleanPageUrl,
                    domainId: domain.id,
                });
            }
            // Persist pages
            const newPages = await PrismaService.createMany('page', newPagesCollection);
            EventEmitter.emit(EVENTS.create.initialPageIndex, domain.id);
            return newPages;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new PageService();