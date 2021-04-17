import Sitemapper from 'sitemapper';

import PrismaService from './PrismaService.js';

class DomainService {
    constructor() {
        this.sitemapper = new Sitemapper();
    }

    async fetchPages(url) {
        return this.sitemapper.fetch(`${url}/sitemap.xml`)
            .then(({ sites }) => sites)
            .catch((error) => console.error(error));
    }

    async indexPages(domain) {
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

        return await PrismaService.createMany('page', newPages);
    }
};

export default new DomainService();
