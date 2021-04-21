import { ENUMS } from '../config/index.js';
import PrismaService from './PrismaService';

class SubscriptionService {
    getValidTo(paymentInterval) {
        const now = new Date();
        const numberOfDays = paymentInterval === ENUMS.paymentInterval[0] ? 30 : 365;
        return new Date(now.setDate(now.getDate() + numberOfDays));
    }

    async create(body) {
        const { domainId, paymentInterval } = body;
        const validTo = this.getValidTo(paymentInterval);
        const subscriptionData = { domainId, paymentInterval, validTo };
        const newSubscription = await PrismaService.create('subscription', subscriptionData);
        return newSubscription;
    }
};

export default new SubscriptionService();