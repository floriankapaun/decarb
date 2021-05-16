import fetch from 'node-fetch';

import { ECOLOGI_API_ENTRYPOINT, ECOLOGI_API_KEY, ENUMS, MODE } from '../config/index.js';
import { addDaysToDate, copyDate, getTimestampString } from '../utils/date.js';
import DomainService from './DomainService.js';
import PrismaService from './PrismaService.js';

class OffsetService {
    async getCurrent(subscriptionId, timestamp = new Date()) {
        const params = {
            subscriptionId,
            from: { lte: timestamp },
            until: { gte: timestamp },
        };
        const options = {
            orderBy: { createdAt: 'desc' },
        };
        const currentOffset = await PrismaService.findFirst('offset', params, options);
        return currentOffset;
    }

    async getEmissionKilograms(domainId, from, until) {
        let sqlFrom;
        let sqlUntil;

        if (from) sqlFrom = getTimestampString(from);
        if (until) sqlUntil = getTimestampString(until);

        const domainEmissionMilligrams = await DomainService.aggregateDomainEmissions(
            domainId,
            sqlFrom,
            sqlUntil
        );
        if (!domainEmissionMilligrams) return 0;
        return Math.ceil(domainEmissionMilligrams / 1000000);
    }

    getFrom(until, paymentInterval) {
        const end = copyDate(until);
        const numberOfDays = paymentInterval === ENUMS.paymentInterval[0] ? -30 : -365;
        return addDaysToDate(end, numberOfDays);
    }

    /**
     * Creates the first Offset linked to a Subscription
     * 
     * @param {String} subscriptionId - Id of linked Subscription
     * @returns {Object} - Offset
     */
    async createFirst(subscriptionId) {
        // Get subscription
        const subscription = await SubscriptionService.get(subscriptionId);
        // Get time range
        const until = copyDate(subscription.validTo);
        const from = this.getFrom(until, subscription.paymentInterval);
        // Create Offset
        const offsetData = {
            domainId,
            subscriptionId: subscription.id,
            offsetType: subscription.offsetType,
            from,
            until,
        };
        return await PrismaService.create('offset', offsetData);
    }

    async recordOffsetKilograms(offsetId, kg, timestamp = new Date()) {
        return await PrismaService.update('offset', offsetId, {
            offsetKilograms: {
                increment: kg,
            },
            recordedUntil: timestamp,
        });
    }

    async handleFailedPurchase(offsetId, response) {
        // TODO: Send E-Mail to admin to handle the problem
        console.error(`⚠️ Failed to buy offset for id: ${offsetId}. Response: `, response);
        const updatedOffsetData = { purchaseStatus: ENUMS.purchaseStatus[2] }; // 'FAILED'
        const updatedOffset = await PrismaService.update('offset', offsetId, updatedOffsetData);
        return updatedOffset;
    }

    async handleSuccessfulPurchase(offsetId, amount, currency) {
        const updatedOffsetData = {
            price: amount,
            currency: currency,
            purchaseStatus: ENUMS.purchaseStatus[1], // 'SUCCESSFULL'
        };
        const updatedOffset = await PrismaService.update('offset', offsetId, updatedOffsetData);
        return updatedOffset;
    }

    async setupPurchase(offset) {
        const { id, offsetKilograms } = offset;
        // Purchase offsets from ecologi
        const response = await this.purchaseCarbonOffsets(id, offsetKilograms);
        if (!response || !response.amount || !response.currency) {
            return await this.handleFailedPurchase(id, response);
        }
        const updatedOffset = await this.handleSuccessfulPurchase(id, response.amount, response.currency);
        // TODO: Handle Stripe payment
        return updatedOffset;
    }

    /**
     * Purchase Carbon Offsets from Ecologi
     * 
     * Reference: https://docs.ecologi.com/docs/public-api-docs/API/Impact-API.v1.yaml/paths/~1impact~1carbon/post
     * 
     * @param {UUID} offsetId - from database used as Idempotency-Key
     * @param {Number} number - the number of units to purchase
     * @param {ENUM} units - 'KG' or 'Tonnes'
     * @param {Boolean} test - whether this is a test or not
     * 
     * @return {Object} - ecologi api response
     */
    async purchaseCarbonOffsets(offsetId, number, test = false, units = 'KG') {
        if (typeof number !== 'number') throw('🚫 You have to provide a number. Provided: ', number);
        if ((units === 'KG' && number < 1) || (units === 'Tonnes' && number < 0.001)) {
            throw('🚫 Number of carbon offsets must be at least 1 KG or 0.001 Tonnes. Provided: ', number, units);
        }
        return await fetch(`${ECOLOGI_API_ENTRYPOINT}/impact/carbon`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${ECOLOGI_API_KEY}`,
                'Content-Type': 'application/json',
                'Idempotency-Key': offsetId,
            },
            body: JSON.stringify({
                number,
                units,
                test: MODE !== 'production' || test ? true : false,
            }),
        })
            .then((response) => response.json())
            .catch((error) => console.error(error));
    }
};

export default new OffsetService();