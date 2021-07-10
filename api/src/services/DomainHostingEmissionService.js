import fetch from 'node-fetch';
import AppError from '../utils/AppError.js';

import PrismaService from './PrismaService.js';

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
            throw new AppError(`Couldn't find DomainHostingEmission for "${domainId}"`, 404);
        }
        delete hostingEmissions.id;
        delete hostingEmissions.createdAt;
        return hostingEmissions;
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
}

export default new DomainHostingEmissionService();
