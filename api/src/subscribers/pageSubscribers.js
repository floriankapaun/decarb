import PageViewEmissionService from '../services/PageViewEmissionService.js';


export const createManyPagesSubscriber = (pages) => {
    console.log('🗃️ Created Many Pages', pages);
};


/**
 * After the initial page index was created for a Domain, create
 * PageViewEmissions for the created pages.
 * 
 * @param {String} domainId 
 */
export const createInitialPageIndexSubscriber = (domainId) => {
    console.log('🗃️ Created initial PageIndex for Domain: ', domainId);
    PageViewEmissionService.initialCalculations(domainId);
};