import Sitemapper from 'sitemapper';
import fetch from 'node-fetch';

import PrismaService from './PrismaService.js';
import EventEmitter from '../utils/eventEmitter.js';
import { EVENTS } from '../config/index.js';

class DomainService {
    constructor() {
        this.sitemapper = new Sitemapper();
    }

    async createDomainHostingEmission(domain) {
        const prettyDomainUrl = domain.url.replace(/^(https?:|)\/\//, '');
        const tgwfResponse = await fetch(`http://api.thegreenwebfoundation.org/greencheck/${prettyDomainUrl}`)
            .then((response) => response.json());
        const domainHostingEmissionData = {
            domainId: domain.id,
            greenHosting: tgwfResponse.green,
        };
        return await PrismaService.create('domainHostingEmission', domainHostingEmissionData);
    }

    async fetchPages(url) {
        return this.sitemapper.fetch(`${url}/sitemap.xml`)
            .then(({ sites }) => sites)
            .catch((error) => console.error(error));
    }

    /**
     * Searches for a domains pages and persists them to the database.
     * Only fired on domain creation.
     * 
     * @param {Object} domain
     * 
     * @returns {Object} - number of pages added to database
     */
    async createInitialPageIndex(domain) {
        // Crawl sitemap and index pages
        const pages = await this.fetchPages(domain.url);

        if (!pages.length) return console.error('⚠️ Sitemap not found, no access granted or empty');

        const newPages = [];

        // Milliseconds or even seconds are not important hence
        // we create only one date outside the for loop.
        const now = new Date();

        for (const page of pages) {
            // TODO: Look for http https www differences
            if (!page.startsWith(domain.url)) {
                console.error(`⚠️ Page "${page}" is propably no part of "${domain.url}"`);
                continue; // skips this iteration
            }

            newPages.push({
                url: page,
                domainId: domain.id,
                createdAt: now,
            });
        }

        const result = await PrismaService.createMany('page', newPages);
        EventEmitter.emit(EVENTS.create.initialPageIndex, domain.id);
        return result;
    }
};

export default new DomainService();
