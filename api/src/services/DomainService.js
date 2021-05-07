import Sitemapper from 'sitemapper';
import fetch from 'node-fetch';

import PrismaService from './PrismaService.js';
import EventEmitter from '../utils/eventEmitter.js';
import { ENUMS, EVENTS } from '../config/index.js';
import { cleanUrl } from '../utils/url.js';
import AppError from '../utils/AppError.js';

class DomainService {
    constructor() {
        this.sitemapper = new Sitemapper();
    }

    async create(domainData, owner) {
        domainData.url = cleanUrl(domainData.url);
        // Create domainUser relation as well
        domainData.users = {
            create: [
                {
                    userId: owner.id,
                    role: ENUMS.role[0],
                },
            ],
        };
        const newDomain = await PrismaService.create('domain', domainData);
        return newDomain;
    }

    async createDomainHostingEmission(domain) {
        const prettyDomainUrl = domain.url.replace(/^(https?:|)\/\//, '');
        const tgwfResponse = await fetch(`http://api.thegreenwebfoundation.org/greencheck/${prettyDomainUrl}`)
            .then((response) => response.json());
        const domainHostingEmissionData = {
            domainId: domain.id,
            renewableEnergy: tgwfResponse.green,
        };
        return await PrismaService.create('domainHostingEmission', domainHostingEmissionData);
    }

    async fetchPages(url) {
        return this.sitemapper.fetch(`https://${url}/sitemap.xml`)
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

        // TODO: Remove this timestamp --> is handled by default value
        // Milliseconds or even seconds are not important hence
        // we create only one date outside the for loop.
        const now = new Date();

        for (const page of pages) {
            // TODO: Look for http https www differences
            if (!cleanUrl(page).startsWith(domain.url)) {
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

    async verifyOwnership(domainId) {
        // TODO: Implement Script implementation validation via Puppeteer
        const validImplementation = true;
        if (!validImplementation) {
            throw new AppError('Invalid Script Implementation', 401);
        }
        const data = { verifiedAt: new Date() };
        const verifiedDomain = await PrismaService.update('domain', domainId, data);
        return verifiedDomain;
    }

    async aggregateDomainEmissions(domainId, start, end) {
        const query = `
            SELECT
                SUM(page_view_emissions.emission_milligrams) AS "domain_emissions"
            FROM
                domains
                JOIN pages ON domains.id = pages.domain_id
                JOIN page_views ON pages.id = page_views.page_id
                JOIN page_view_emissions ON page_view_emissions.id = page_views.page_view_emission_id
            WHERE
                domains.id = '${domainId}'
                AND page_views.created_at >= TO_DATE('${start}', 'YYYY-MM-DD')
                AND page_views.created_at <= TO_DATE('${end}', 'YYYY-MM-DD')
        `;
        const domainEmissions = await PrismaService.queryRaw(query);
        return domainEmissions[0].domain_emissions;
    }
};

export default new DomainService();
