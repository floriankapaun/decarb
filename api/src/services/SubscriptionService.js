import { DAYS_IN_MONTH, DAYS_IN_YEAR, ENUMS } from '../config/index.js';
import AppError from '../utils/AppError.js';
import { addDaysToDate } from '../utils/date.js';
import PrismaService from './PrismaService.js';

class SubscriptionService {


    async create(body) {
        const { domainId, offsetType, paymentInterval, stripePriceId } = body;
        const validTo = this.getValidTo(paymentInterval);
        const subscriptionData = { domainId, offsetType, paymentInterval, stripePriceId, validTo };
        const newSubscription = await PrismaService.create('subscription', subscriptionData);
        return newSubscription;
    }


    async get(id) {
        if (!id) {
            throw new AppError(`Can't get a subscription without "id"`, 400);
        }
        const subscription = await PrismaService.findUnique('subscription', { id });
        if (!subscription) {
            throw new AppError(`Subscription with ID ${id} not found`, 401);
        }
        return subscription;
    }

    
    /**
     * Get the current Subscription for a Domain by domainId
     * 
     * @param {String} domainId
     * @returns {Object} - Subscription
     */
    async getByDomainId(domainId) {
        const params = {
            domainId,
            deletedAt: null,
        };
        const options = {
            orderBy: { createdAt: 'desc' },
        };
        const subscription = await PrismaService.findFirst('subscription', params, options);
        if (!subscription) {
            throw new AppError(
                `No active Subscription found for Domain: ${req.body.domainId}`,
                500
            );
        }
        return subscription;
    }


    /**
     * Returns a Subscription with the according stripeSubscriptionId
     * 
     * @param {String} stripeSubscriptionId
     * @returns {Object} - Subscription
     */
    async getByStripeSubscriptionId(stripeSubscriptionId) {
        return await PrismaService.findUnique('subscription', {
            stripeSubscriptionId: stripeSubscriptionId,
        });
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


    getValidTo(paymentInterval) {
        const now = new Date();
        const numberOfDays = paymentInterval === ENUMS.paymentInterval[0]
            ? DAYS_IN_MONTH
            : DAYS_IN_YEAR;
        return addDaysToDate(now, numberOfDays);
    }


    /**
     * Update a Subscription
     * 
     * @param {String} id - Subscription ID
     * @param {Object} data - New data
     * @returns {Object} - Updated Subscription
     */
     async update(id, data) {
        return await PrismaService.update('subscription', id, data);
    }
};

export default new SubscriptionService();
