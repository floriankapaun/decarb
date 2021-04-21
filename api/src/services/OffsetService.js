import fetch from 'node-fetch';

import { ECOLOGI_API_ENTRYPOINT, ECOLOGI_API_KEY, ENUMS, MODE } from '../config/index.js';
import { addDaysToDate, copyDate, getDateString } from '../utils/date.js';
import DomainService from './DomainService.js';
import PrismaService from './PrismaService.js';

class OffsetService {
    async getCurrentSubscription(domainId) {
        const options = {
            orderBy: { createdAt: 'desc' },
            where: { deletedAt: null },
        };
        return await PrismaService.findFirst('subscription', { domainId }, options);
    }

    async getEmissionKilograms(domainId, from, until) {
        const sqlFrom = getDateString(from);
        const sqlUntil = getDateString(until);
        const domainEmissionMilligrams = await DomainService.aggregateDomainEmissions(domainId, sqlFrom, sqlUntil);
        return Math.ceil(domainEmissionMilligrams / 1000000);
    }

    getFrom(until, paymentInterval) {
        const end = copyDate(until);
        const numberOfDays = paymentInterval === ENUMS.paymentInterval[0] ? -30 : -365;
        return addDaysToDate(end, numberOfDays);
    }

    async create(domainId) {
        // Get current subscription
        const currentSubscription = await this.getCurrentSubscription(domainId);
        // Get time range
        const until = copyDate(currentSubscription.validTo);
        const from = this.getFrom(until, currentSubscription.paymentInterval);
        // Get domain offsets in time range in kilograms
        const offsetKilograms = await this.getEmissionKilograms(domainId, from, until);
        // Create Offset
        const offsetData = {
            domainId,
            subscriptionId: currentSubscription.id,
            offsetType: currentSubscription.offsetType,
            from,
            until,
            offsetKilograms,
        };
        const newOffset = await PrismaService.create('offset', offsetData);
        return newOffset;
        // 1. Decide on offsetType
        // 2. Create Offset (in DB)
        // 3. Get data needed
        // 4. Purchase offset
        // 5. Update Offset (in DB)
        // 6. Increase subscription validTo and therefore verlänger kündigungsfrist
        // 7. Return
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