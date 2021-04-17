import Sitemapper from 'sitemapper';

import PrismaService from '../services/prisma.js';

const sitemap = new Sitemapper();

const getPages = async (url) => {
    return sitemap.fetch(`${url}/sitemap.xml`)
        .then(({ sites }) => sites)
        .catch((error) => console.error(error));
};

export const createDomainSubscriber = (domain) => {
    console.log('🗃️ Created Domain', domain);
    // Crawl sitemap and index pages
    const pages = getPages(domain.url);

    if (!pages.length) return console.error('⚠️ Sitemap not found, no access granted or empty');

    const newDomain = {
        pages: {
            createMany: {
                data: [],
                skipDuplicates: true,
            },
        },
    };

    // Milliseconds or even seconds are not important hence
    // we create only one date outside the for loop.
    const now = new Date();

    for (const page of pages) {
        // TODO: Look for http https www differences
        if (!page.startsWith(data.url)) {
            console.error(`⚠️ Page "${page}" is propably no part of "${data.url}"`);
            continue; // skips this iteration
        }

        newDomain.pages.createMany.data.push({
            url: page,
            createdAt: now,
        });
    }

    PrismaService.update('domain', domain.id, newDomain);
};

export const deleteDomainSubscriber = (data) => {
    console.log('DELETE_DOMAIN_EVENT', data);
}