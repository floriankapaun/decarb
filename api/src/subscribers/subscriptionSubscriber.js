import OffsetService from "../services/OffsetService";

export const startSubscriptionSubscriber = (subscription) => {
    console.log('🗃️ Started new Subscription', subscription);
    const { domainId, id } = subscription;
    // Create first Offset Entry for Subscription
    OffsetService.createFirst(domainId, id)
};