import fetch from 'node-fetch';

import PrismaService from './PrismaService.js';
import { PING_SCRIPT_URL, ENUMS, CLIENT_ENTRYPOINT, DOMAIN_PAGES_RESPONSE_LIMIT } from '../config/index.js';
import { cleanUrl } from '../utils/url.js';
import AppError from '../utils/AppError.js';

class DomainService {
    

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


    /**
     * Returns all Domains a authenticated User has access to
     * 
     * @param {Object} req 
     * @param {String} [req.params.id]
     * @param {String} [req.currentUser.id]
     * @returns {Object} - Users Domains
     */
    getByUser(req) {
        const { id, } = req.params;
        const userId = req.currentUser.id;
        if (id !== userId) {
            throw new AppError(`User ID "${id}" not matching Access Token User`, 400);
        }
        // Seems odd to me but this is how to do it
        // See: https://github.com/prisma/prisma/discussions/2429#discussioncomment-14132
        const options = { where: { users: { some: { userId: { equals: userId }}}}};
        return PrismaService.findMany('domain', options);
    }


    /**
     * Returns a publicly displayable Version of all Domains
     * 
     * @returns {Array} - Contains Domain Objects 
     */
    getAllPublic() {
        return PrismaService.findMany('domain', {
            select: {
                url: true,
                companyName: true,
            },
            where: {
                verifiedAt: { not: null },
                deletedAt: { equals: null },
            }
        });
    }


    /**
     * Gets a Domain and its Pages
     * 
     * @param {String} id - Domain ID
     * @returns {Object} - Domain and Pages
     */
    getIncludingPages(id) {
        // Include pages, but only their 'url' and 'createdAt'
        const options = {
            include: {
                pages: {
                    select: {
                        url: true,
                        createdAt: true,
                    },
                    take: DOMAIN_PAGES_RESPONSE_LIMIT,
                }
            }
        };
        return PrismaService.findUnique('domain', { id }, options);
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
                console.log(err);
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
            throw new AppError('Invalid Script Implementation', 406);
        }
        const data = { verifiedAt: new Date() };
        const verifiedDomain = await PrismaService.update('domain', domainId, data);
        return verifiedDomain;
    }

    /**
     * Get the current emissionMilligrams for each Page of a Domain
     * 
     * TODO: Refactor emissionMilligrams to byte and adapt client side as well
     * 
     * @param {String} domainId - ID of Domain
     * @param {Number} [itemLimit=10] - Max number of Pages to return
     * @param {Number} [itemOffset=0] - Offset in list of return
     * @returns {Object} - Page URLs of Domain with current emission milligrams
     */
    async getCurrentPageViewEmissions(domainId, itemLimit = 10, itemOffset = 0) {
        const query = `
        SELECT
                pages.url as "url",
                page_view_emissions.byte as "emissionMilligrams"
            FROM
                domains
                JOIN pages ON pages.domain_id = domains.id
                JOIN page_view_emissions ON page_view_emissions.page_id = pages.id
            WHERE
                domains.id = '${domainId}'
                AND page_view_emissions.created_at = (
                    SELECT MAX(pve.created_at)
                    FROM page_view_emissions pve
                    WHERE pve.page_id = page_view_emissions.page_id
                )
            ORDER BY "emissionMilligrams" DESC
            LIMIT ${itemLimit}
            OFFSET ${itemOffset}
        `;
        const pageViewEmissions = await PrismaService.queryRaw(query);
        return pageViewEmissions;
    }

    /**
     * Get PageViews for each Page of a Domain (in time range)
     * 
     * @param {String} domainId - ID of Domain
     * @param {String} timeStart - Start Timestamp
     * @param {String} [timeEnd=now] - End Timestamp
     * @param {Number} [itemLimit=10] - Max number of Pages to return
     * @param {Number} [itemOffset=0] - Offset in list of return
     * @returns {Object} - Pages and their cummulated PageViews
     */
    async getPageViews(domainId, timeStart, timeEnd = new Date(), itemLimit = 10, itemOffset = 0) {
        const query = `
            SELECT
                pages.url,
                COUNT(pages.id) AS "pageViews"
            FROM
                domains
                JOIN pages ON pages.domain_id = domains.id
                JOIN page_views ON page_views.page_id = pages.id
            WHERE
                domains.id = '${domainId}'
                ${timeStart
                    ? `AND page_views.created_at >= TO_TIMESTAMP('${timeStart}', 'YYYY-MM-DD HH24:MI:SS')`
                    : null
                }
                ${timeEnd
                    ? `AND page_views.created_at <= TO_TIMESTAMP('${timeEnd}', 'YYYY-MM-DD HH24:MI:SS')`
                    : null
                }
            GROUP BY pages.url
            ORDER BY "pageViews" DESC
            LIMIT ${itemLimit}
            OFFSET ${itemOffset}
        `;
        const pageViews = await PrismaService.queryRaw(query);
        return pageViews;
    }

    /**
     * Get a domains cummulated pageviews (in time range)
     * 
     * @param {String} domainId - ID of Domain
     * @param {Datetime} timeStart - Start of time range
     * @param {Datetime} [timeEnd=now] - End of time range
     * @returns {Object} - aggregated PageViews
     */
    async getAggregatedPageViews(domainId, timeStart, timeEnd = new Date()) {
        const query = `
            SELECT
                COUNT(pages.id) AS "pageViews"
            FROM
                domains
                JOIN pages ON pages.domain_id = domains.id
                JOIN page_views ON page_views.page_id = pages.id
            WHERE
                domains.id = '${domainId}'
                ${timeStart
                    ? `AND page_views.created_at >= TO_TIMESTAMP('${timeStart}', 'YYYY-MM-DD HH24:MI:SS')`
                    : null
                }
                ${timeEnd
                    ? `AND page_views.created_at <= TO_TIMESTAMP('${timeEnd}', 'YYYY-MM-DD HH24:MI:SS')`
                    : null
                }
        `;
        const aggregatedPageViews = await PrismaService.queryRaw(query);
        return aggregatedPageViews;
    }

    async getAggregatedDailyPageViews(domainId, timeStart, timeEnd) {
        const query = `
            SELECT
                DATE_TRUNC('day', page_views.created_at) AS "day",
                COUNT(page_views.id) AS "pageViews"
            FROM
                domains
                JOIN pages ON pages.domain_id = domains.id
                JOIN page_views ON page_views.page_id = pages.id
            WHERE
                domains.id = '${domainId}'
                ${timeStart
                    ? `AND page_views.created_at >= TO_TIMESTAMP('${timeStart}', 'YYYY-MM-DD HH24:MI:SS')`
                    : null
                }
                ${timeEnd
                    ? `AND page_views.created_at <= TO_TIMESTAMP('${timeEnd}', 'YYYY-MM-DD HH24:MI:SS')`
                    : null
                }
            GROUP BY "day"
            ORDER BY "day" ASC
        `;
        const pageViewsPerDay = await PrismaService.queryRaw(query);
        return pageViewsPerDay;
    }

    /**
     * Get a Domains public profile Data by URL
     * 
     * @param {String} url - Domain URL
     * @returns {Object} - Profile data
     */
    async getDomainProfile(url) {
        // Get Domain Data
        const domain = await PrismaService.findUnique('domain', { url });
        if (!domain) {
            throw new AppError(`There is no Domain with URL "${url}". Register at ${CLIENT_ENTRYPOINT}/register`, 404);
        }
        // Get aggregated Offset amount for Domain
        const aggregation = await PrismaService.aggregate('offset', {
            _sum: {
                offsetKilograms: true,
            },
            where: {
                domainId: { equals: domain.id },
            },
        });
        // Return profile data
        return {
            url: domain.url,
            companyName: domain.companyName,
            createdAt: domain.createdAt,
            offsetKilograms: aggregation._sum.offsetKilograms,
        };
    }

    /**
     * Get cummulated data of all purchased Offsets of a Domain
     * 
     * @param {String} domainId - ID of Domain
     * @returns {Object} - cummulated purchased Offsets
     */
    async getAggregatedOffsets(domainId) {
        const aggregatedOffsets = await PrismaService.aggregate('offset', {
            _min: { from: true },
            _max: { until: true },
            _sum: {
                cents: true,
                offsetKilograms: true,
            },
            where: {
                domainId,
                purchaseStatus: { equals: 'SUCCESSFULL' },
            },
        });
        return aggregatedOffsets;
    }
};

export default new DomainService();
