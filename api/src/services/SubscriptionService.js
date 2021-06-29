import { DAYS_IN_MONTH, DAYS_IN_YEAR, ENUMS } from '../config/index.js';
import AppError from '../utils/AppError.js';
import { addDaysToDate } from '../utils/date.js';
import PrismaService from './PrismaService.js';

class SubscriptionService {
    getValidTo(paymentInterval) {
        const now = new Date();
        const numberOfDays = paymentInterval === ENUMS.paymentInterval[0]
            ? DAYS_IN_MONTH
            : DAYS_IN_YEAR;
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
                stripeSubscriptionId: true,
                stripeSubscriptionItemId: true,
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

    async get(id) {
        if (!id) {
            throw new AppError(`Can't get a subscription without "id"`, 400);
        }
        const subscription = await PrismaService.findUnique('subscription', { id });
        return subscription;
    }


    /**
     * Tries to find the subscriptionItemId related to a Stripe Event
     * 
     * @param {Object} object - Stripe event data
     * @returns {String?} - subscriptionItemId or null
     */
    async getSubscriptionItemId(object) {
        if (object?.lines?.data?.[0]?.subscription_item) {
            return object?.lines?.data?.[0]?.subscription_item;
        }
        const subscriptionId = object?.subscription;
        if (!subscriptionId) {
            // Log the given data for debugging
            console.error(object);
            throw new AppError('Not enough information given to getSubscriptionItemId()', 406);
        }
        const subscription = await PrismaService.findUnique('subscription', { id: subscriptionId });
        if (subscription?.stripeSubscriptionItemId) return subscription.stripeSubscriptionItemId;
        return null;
    }
};

export default new SubscriptionService();
