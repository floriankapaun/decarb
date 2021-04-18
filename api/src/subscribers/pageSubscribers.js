import PageViewEmissionService from '../services/PageViewEmissionService';

export const createManyPagesSubscriber = (pages) => {
    console.log('🗃️ Created Many Pages', pages);
};

export const createInitialPageIndexSubscriber = (domainId) => {
    console.log('🗃️ Created initial PageIndex for Domain: ', domainId);
    PageViewEmissionService.initialCalculations(domainId);
};