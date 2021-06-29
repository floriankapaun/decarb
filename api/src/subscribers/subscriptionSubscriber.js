import OffsetService from '../services/OffsetService.js';

export const startSubscriptionSubscriber = (subscription) => {
    console.log('🗃️ Started new Subscription', subscription);
    // Create first Offset Entry for Subscription
    OffsetService.createInitial(subscription.id)
};