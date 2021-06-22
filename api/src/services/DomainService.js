import Sitemapper from 'sitemapper';
import fetch from 'node-fetch';

import PrismaService from './PrismaService.js';
import EventEmitter from '../utils/eventEmitter.js';
import { PING_SCRIPT_URL, ENUMS, EVENTS } from '../config/index.js';
import { cleanUrl } from '../utils/url.js';
import AppError from '../utils/AppError.js';

class DomainService {
    constructor() {
        this.sitemapper = new Sitemapper();
    }

    /**
     * Creates a new Domain including DomainUser Role
     * 
     * @param {Object} clientDomainData - provided by client
     * @param {String} [clientDomainData.url]
     * @param {Number} [clientDomainData.estimatedMonthlyPageViews]
     * @param {Object} owner - provided by attachCurrentUser middleware
     * @returns {Object} - New Domain
     */
    async create(clientDomainData, owner) {
        // Validate 'clientDomainData'
        if (!clientDomainData.url) {
            throw new AppError('Required parameter "url" missing.', 400);
        }
        if (typeof clientDomainData.url !== 'string') {
            throw new AppError('Parameter "url" has to be string.', 400);
        }
        if (!clientDomainData.estimatedMonthlyPageViews) {
            throw new AppError('Required parameter "estimatedMonthlyPageViews" missing.', 400);
        }
        if (typeof clientDomainData.estimatedMonthlyPageViews !== 'number') {
            throw new AppError('Parameter "estimatedMonthlyPageViews" has to be number.', 400);
        }
        const domainData = {
            estimatedMonthlyPageViews: clientDomainData.estimatedMonthlyPageViews,
            url: cleanUrl(clientDomainData.url),
            // Create domainUser relation as well
            users: {
                create: [
                    {
                        userId: owner.id,
                        role: ENUMS.role[0], // 'OWNER'
                    },
                ],
            }
        }
        const newDomain = await PrismaService.create('domain', domainData);
        return newDomain;
    }

    /**
     * Get Domain by ID
     * 
     * @param {String} id - ID of Domain
     * @returns {Promise} - Domain Object
     */
    getById(id) {
        return PrismaService.findUnique('domain', { id });
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

    /**
     * Validate a Domains Tracking-Script implementation
     * 
     * NOTE: Current Implementation does not Support dynamic Script emebeddings like they could
     * seldomly appear in SPAs
     * 
     * OPTIMIZE: i.e. check multiple random pages, see if pageviews are registered, ...
     * 
     * @param {Object} domain - Domain Object
     * @returns {Boolean}
     */
    async validateImplementation(domain) {
        const body = await fetch(`https://${domain.url}`)
            .then((res) => {
                if (res.ok) { // res.status >= 200 && res.status < 300
                    return res.text();
                }
                throw new AppError(res.statusText);
            })
            .catch((err) => {
                throw new AppError(err)
            });
        if (typeof body !== 'string') return false
        return body.includes(PING_SCRIPT_URL);
    }

    /**
     * Verifies Domain Ownership
     * 
     * @param {String} domainId - Domain ID
     * @returns {Object} - Verified Domain
     */
    async verifyOwnership(domainId) {
        const domain = await this.getById(domainId);
        const validImplementation = await this.validateImplementation(domain);
        if (!validImplementation) {
            throw new AppError('Invalid Script Implementation', 401);
        }
        const data = { verifiedAt: new Date() };
        const verifiedDomain = await PrismaService.update('domain', domainId, data);
        return verifiedDomain;
    }

    async aggregatePageViews(domainId, timeStart, timeEnd, itemLimit, itemOffset) {
        const query = `
            SELECT
                pages.url AS "pageUrl",
                COUNT(pages.id) AS "pageViews"
            FROM
                domains
                JOIN pages ON pages.domain_id = domains.id
                JOIN page_views ON page_views.page_id = pages.id
            WHERE
                domains.id = '${domainId}'
                AND page_views.created_at >= TO_TIMESTAMP('${timeStart}', 'YYYY-MM-DD HH24:MI:SS')
                AND page_views.created_at <= TO_TIMESTAMP('${timeEnd}', 'YYYY-MM-DD HH24:MI:SS')
            GROUP BY "pageUrl"
            ORDER BY "pageViews" DESC
            LIMIT ${itemLimit}
            OFFSET ${itemOffset}
        `;
        const pageViews = await PrismaService.queryRaw(query);
        return pageViews;
    }

    async aggregatePageViewsPerDay(domainId, timeStart, timeEnd, itemLimit, itemOffset) {
        const query = `
            SELECT
                pages.url AS "pageUrl",
                DATE_TRUNC('day', page_views.created_at) AS "day",
                COUNT(pages.id) AS "pageViews"
            FROM
                domains
                JOIN pages ON pages.domain_id = domains.id
                JOIN page_views ON page_views.page_id = pages.id
            WHERE
                domains.id = '${domainId}'
                AND page_views.created_at >= TO_TIMESTAMP('${timeStart}', 'YYYY-MM-DD HH24:MI:SS')
                AND page_views.created_at <= TO_TIMESTAMP('${timeEnd}', 'YYYY-MM-DD HH24:MI:SS')
            GROUP BY "pageUrl", "day"
            ORDER BY "pageUrl"
            LIMIT ${itemLimit}
            OFFSET ${itemOffset}
        `;
        const pageViewsPerDay = await PrismaService.queryRaw(query);
        return pageViewsPerDay;
    }

    async aggregateDomainEmissions(domainId, timeStart, timeEnd) {
        let query = `
            SELECT
                SUM(page_view_emissions.emission_milligrams) AS "domain_emissions"
            FROM
                domains
                JOIN pages ON domains.id = pages.domain_id
                JOIN page_views ON pages.id = page_views.page_id
                JOIN page_view_emissions ON page_view_emissions.id = page_views.page_view_emission_id
            WHERE
                domains.id = '${domainId}'
        `;
        if (timeStart) {
            query += `AND page_views.created_at >= TO_TIMESTAMP('${timeStart}', 'YYYY-MM-DD HH24:MI:SS')`;
        }
        if (timeEnd) {
            query += `AND page_views.created_at <= TO_TIMESTAMP('${timeEnd}', 'YYYY-MM-DD HH24:MI:SS')`;
        }
        const domainEmissions = await PrismaService.queryRaw(query);
        return domainEmissions[0].domain_emissions;
    }
};

export default new DomainService();
