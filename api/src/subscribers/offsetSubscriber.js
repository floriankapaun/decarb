import OffsetService from "../services/OffsetService";

export const createOffsetSubscriber = (offset) => {
    console.log('🗃️ Created Offset', offset);
    OffsetService.setupPurchase(offset);
};