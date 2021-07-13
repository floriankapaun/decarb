import fetch from 'node-fetch';

import AppError from '../utils/AppError.js';
import PrismaService from './PrismaService.js';


/**
 * Controls the 'DomainHostingEmission' Property
 */
class DomainHostingEmissionService {


    /**
     * Get a Domains current DomainHostingEmissions
     * 
     * @param {String} domainId - ID of Domain
     * @returns {Object} - Domains current DomainHostingEmissions
     */
    async getCurrent(domainId) {
        const options = { orderBy: { createdAt: 'desc' } };
        const hostingEmissions = await PrismaService.findFirst(
            'domainHostingEmission',
            { domainId },
            options
        );
        if (!hostingEmissions) {
            throw new AppError(
                `Failed to find DomainHostingEmission for "${domainId}"`,
                500
            );
        }
        delete hostingEmissions.id;
        delete hostingEmissions.createdAt;
        return hostingEmissions;
    }


    /**
     * Create a DomainHostingEmission for Domain
     * 
     * @param {Object} domain
     * @param {String} [domain.url]
     * @param {String} [domain.id]
     * @returns {Object} - New DomainHostingEmission
     */
    async createDomainHostingEmission(domain) {
        const prettyDomainUrl = domain.url.replace(/^(https?:|)\/\//, '');
        const tgwfResponse = await fetch(`http://api.thegreenwebfoundation.org/greencheck/${prettyDomainUrl}`)
            .then((response) => response.json());
        if (!tgwfResponse?.green) {
            throw new AppError(
                `Failed to fetch info from The Green Web Foundation for "${domain.url}"`,
                500
            );
        }
        return await PrismaService.create('domainHostingEmission', {
            domainId: domain.id,
            renewableEnergy: tgwfResponse.green,
        });
    }
}

export default new DomainHostingEmissionService();
