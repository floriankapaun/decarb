import DomainHostingEmissionService from '../services/DomainHostingEmissionService.js';
import PageService from '../services/PageService.js';


/**
 * If a new Domain was created, create DomainHostingEmission and an
 * initial page index for it. The page index is used for first
 * emission estimation.
 * 
 * @param {Object} domain 
 */
export const createDomainSubscriber = async (domain) => {
    console.info('🗃️ Created Domain', domain);
    DomainHostingEmissionService.createDomainHostingEmission(domain);
    PageService.createInitialIndex(domain);
};


export const updateDomainSubscriber = (newDomain) => {
    console.info('🗃️ Updated Domain', newDomain);
};


export const deleteDomainSubscriber = (deletedDomain) => {
    console.info('DELETE_DOMAIN_EVENT', deletedDomain);
}