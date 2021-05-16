import { ENUMS } from '../config/index.js';
import AppError from '../utils/AppError.js';
import { addDaysToDate } from '../utils/date.js';
import PrismaService from './PrismaService';

class SubscriptionService {
    getValidTo(paymentInterval) {
        const now = new Date();
        const numberOfDays = paymentInterval === ENUMS.paymentInterval[0] ? 30 : 365;
        return addDaysToDate(now, numberOfDays);
    }

    async create(body) {
        const { domainId, offsetType, paymentInterval, stripePriceId } = body;
        const validTo = this.getValidTo(paymentInterval);
        const subscriptionData = { domainId, offsetType, paymentInterval, stripePriceId, validTo };
        const newSubscription = await PrismaService.create('subscription', subscriptionData);
        return newSubscription;
    }

    async getAllActive(now = new Date()) {
        const allActiveSubscriptions = await PrismaService.findMany('subscription', {
            select: {
                id: true,
                domainId: true,
                recordedUntil: true,
                stripeSubscriptionId: true,
            },
            where: {
                deletedAt: null,
                validTo: { gte: now },
            },
            distinct: ['domainId'],
            orderBy: {
                createdAt: 'desc',
            },
        });
        return allActiveSubscriptions;
    }

    async get(subscriptionId) {
        if (!subscriptionId) {
            throw new AppError(`Can't get a subscription without subscriptionId`, 400);
        }
        const subscription = await PrismaService.findUnique('subscription', { subscriptionId });
        return subscription;
    }
};

export default new SubscriptionService();
