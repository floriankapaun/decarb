import DomainHostingEmissionService from '../services/DomainHostingEmissionService.js';
import PageService from '../services/PageService.js';

export const createDomainSubscriber = async (domain) => {
    console.log('🗃️ Created Domain', domain);
    DomainHostingEmissionService.createDomainHostingEmission(domain);
    PageService.createInitialIndex(domain);
};

export const updateDomainSubscriber = (newDomain) => {
    console.log('🗃️ Updated Domain', newDomain);
};

export const deleteDomainSubscriber = (deletedDomain) => {
    console.log('DELETE_DOMAIN_EVENT', deletedDomain);
}