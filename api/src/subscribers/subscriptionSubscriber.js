import OffsetService from '../services/OffsetService.js';


/**
 * If a Subscription gets created, the first Offset has to be
 * generated as well.
 * 
 * @param {Object} subscription 
 */
export const startSubscriptionSubscriber = (subscription) => {
    console.info('🗃️ Started new Subscription', subscription);
    OffsetService.createInitial(subscription.id)
};