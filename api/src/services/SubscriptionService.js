import { ENUMS } from '../config/index.js';
import { addDaysToDate } from '../utils/date.js';
import PrismaService from './PrismaService';

class SubscriptionService {
    getValidTo(paymentInterval) {
        const now = new Date();
        const numberOfDays = paymentInterval === ENUMS.paymentInterval[0] ? 30 : 365;
        return addDaysToDate(now, numberOfDays);
    }

    async create(body) {
        const { domainId, offsetType, paymentInterval } = body;
        const validTo = this.getValidTo(paymentInterval);
        const subscriptionData = { domainId, offsetType, paymentInterval, validTo };
        const newSubscription = await PrismaService.create('subscription', subscriptionData);
        return newSubscription;
    }
};

export default new SubscriptionService();