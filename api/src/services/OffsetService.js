import fetch from 'node-fetch';

import {
    DAYS_IN_MONTH,
    DAYS_IN_YEAR,
    ECOLOGI_API_ENTRYPOINT,
    ECOLOGI_API_KEY,
    ECOLOGI_DEFAULT_UNIT,
    ENUMS,
    MODE,
} from '../config/index.js';
import AppError from '../utils/AppError.js';
import { addDaysToDate, copyDate, getTimestampString } from '../utils/date.js';
import DomainService from './DomainService.js';
import MailService from './MailService.js';
import PrismaService from './PrismaService.js';
import SubscriptionService from './SubscriptionService.js';

/**
 * Controls the 'Offset' Entity
 */
class OffsetService {

    /**
     * Returns the currently active Offset Entry for a Subscription.
     * Active means, that there was no effort to purchase this Offset yet and that the
     * given timestamp falls between its 'from' and 'until' values.
     * 
     * @param {String} subscriptionId - Local Subscription this Offset is linked to
     * @param {DateTime} [timestamp=new Date()] - Time at which the Offset should be the active one
     * @returns {Object} - Current Offset
     */
    async getCurrent(subscriptionId, timestamp = new Date()) {
        const params = {
            subscriptionId,
            from: { lte: timestamp },
            until: { gte: timestamp },
            purchaseStatus: { equals: ENUMS.purchaseStatus[0] }, // 'PENDING'
            price: null,
        };
        const options = {
            orderBy: { createdAt: 'desc' },
        };
        const currentOffset = await PrismaService.findFirst('offset', params, options);
        if (!currentOffset) {
            throw new AppError(`No active Offset for Subscription "${subscriptionId}" found.`, 404);
        }
        return currentOffset;
    }

    /**
     * Returns all currently active Offset Entries.
     * Active means, that the returned Offset is always the one created
     * last for each Subscription and there was no effort to purchase those
     * Offsets yet.
     * 
     * @returns {Array} - All currently active Offsets
     */
    async getAllCurrent() {
        const currentOffsets = await PrismaService.findMany('offset', {
            where: {
                purchaseStatus: { equals: ENUMS.purchaseStatus[0] }, // 'PENDING'
                price: null,
            },
            distinct: ['subscriptionId'],
            orderBy: {
                createdAt: 'desc',
            },
        });
        if (!currentOffsets || !currentOffsets.length) {
            throw new AppError(`No active Offsets found.`, 404);
        }
        return currentOffsets;
    }

    // TODO: Move somewhere else and have a look inside DomainService.aggregateDomainEmissions
    // which could potentially be moved as well.
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

    /**
     * Calculates the start time of an Offsets Time Range.
     * 
     * @param {DateTime} until - End of an Offsets Time Range
     * @param {String} paymentInterval - ENUMS.paymentInterval: 'MONTHLY' or 'YEARLY'
     * @returns {DateTime} - Start of an Offsets Time Range
     */
    calculateStartTime(until, paymentInterval) {
        const end = copyDate(until);
        const numberOfDays = (paymentInterval === ENUMS.paymentInterval[0])
            ? -DAYS_IN_MONTH
            : -DAYS_IN_YEAR;
        return addDaysToDate(end, numberOfDays);
    }

    /**
     * Calculates the end time of an Offsets Time Range.
     * 
     * @param {DateTime} from - Start of an Offsets Time Range
     * @param {String} paymentInterval - ENUMS.paymentInterval: 'MONTHLY' or 'YEARLY'
     * @returns {DateTime} - End of an Offsets Time Range
     */
     calculateStartTime(from, paymentInterval) {
        const start = copyDate(from);
        const numberOfDays = (paymentInterval === ENUMS.paymentInterval[0])
            ? DAYS_IN_MONTH
            : DAYS_IN_YEAR;
        return addDaysToDate(start, numberOfDays);
    }

    /**
     * Creates the initial Offset linked to a Subscription
     * 
     * @param {String} subscriptionId - Id of linked Subscription
     * @returns {Object} - Initial Offset
     */
    async createInitial(subscriptionId) {
        // Get subscription
        const subscription = await SubscriptionService.get(subscriptionId);
        // Get time range
        const until = copyDate(subscription.validTo);
        const from = this.calculateStartTime(until, subscription.paymentInterval);
        // Create Offset
        const offsetData = {
            domainId: subscription.domainId,
            subscriptionId: subscription.id,
            offsetType: subscription.offsetType,
            from,
            until,
        };
        return await PrismaService.create('offset', offsetData);
    }
    
    /**
     * Creates a new Offset for a subscription based on the
     * last – now paid and therefore archived – Offset.
     * 
     * @param {Object} previousOffset - The previous Offset
     * @returns {Object} - New Offset
     */
    async createNext(previousOffset) {
        // Get subscription
        const subscription = await SubscriptionService.get(previousOffset.subscriptionId);
        // Calculate Time Range
        const from = previousOffset.until;
        const until = this.calculateEndTime(from, subscription.paymentInterval);
        // Create Offset
        const offsetData = {
            domainId: previousOffset.domainId,
            subscriptionId: previousOffset.subscriptionId,
            offsetType: previousOffset.offsetType,
            recordedUntil: previousOffset.recordedUntil, // to ensure seamless recording
            from,
            until,
        }
        return await PrismaService.create('offset', offsetData);
    }

    /**
     * Add Number of Kilograms to Offsets 'offsetKilograms' and
     * update 'recordedUntil' value.
     * 
     * @param {String} offsetId - Local Offset ID
     * @param {Number} kg - Kilograms of CO2 to record
     * @param {DateTime} [timestamp=new Date()] - Time of record
     * @returns {Object} - Updated Offset
     */
    async recordOffsetKilograms(offsetId, kg, timestamp = new Date()) {
        return await PrismaService.update('offset', offsetId, {
            offsetKilograms: {
                increment: kg,
            },
            recordedUntil: timestamp,
        });
    }

    /**
     * Purchase Carbon Offsets from Ecologi
     * 
     * Reference: https://docs.ecologi.com/docs/public-api-docs/API/Impact-API.v1.yaml/paths/~1impact~1carbon/post
     * 
     * @param {UUID} offsetId - from database used as Idempotency-Key
     * @param {Number} number - the number of units to purchase
     * @param {Boolean} [test=false] - whether this is a test or not
     * @param {ENUM} [units=ECOLOGI_DEFAULT_UNIT] - 'KG' or 'Tonnes'
     * @return {Object} - ecologi api response
     */
     async purchaseCarbonOffsets(offsetId, number, test = false, units = ECOLOGI_DEFAULT_UNIT) {
        if (typeof number !== 'number') {
            throw new AppError(`🚫 You have to provide a number. Provided: ${number}`, 401);
        }
        if ((units === 'KG' && number < 1) || (units === 'Tonnes' && number < 0.001)) {
            throw new AppError(
                `🚫 Number of carbon offsets must be at least 1 KG or 0.001 Tonnes. Provided: ${number} ${units}`,
                401
            );
        }
        console.log('fetching now...');
        return await fetch(`${ECOLOGI_API_ENTRYPOINT}/impact/carbon`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${ECOLOGI_API_KEY}`,
                'Content-Type': 'application/json',
                'Idempotency-Key': offsetId,
            },
            body: JSON.stringify({
                number,
                units,
                test: (MODE !== 'production' || test) ? true : false,
            }),
        })
            .then((response) => response.json())
            .catch((error) => this.handleFailedPurchase(offsetId, error));
    }

    /**
     * Handles a failed Offset Purchase. Notifies Admin, updates Offset and throws Error.
     * 
     * @param {String} offsetId 
     * @param {Object} response - Response Object from Ecologis API
     * @returns {AppError} - This function always throws an AppError
     */
    async handleFailedPurchase(offsetId, response) {
        // Notify Admin via E-Mail about Failure because this is very sensible functionality
        const mailSubject = '⚠️ Failed to buy Offsets from Ecologi';
        const mailBody = `
            <h1>Failed to buy Offsets from Ecologi</h1>
            <p>For Offset: "${offsetId}"</p>
            <p>Response from Ecologi: ${JSON.stringify(response)}</p>
        `;
        await MailService.send(mailSubject, mailBody);
        // Update the offsets purchaseStatus
        const updatedOffsetData = { purchaseStatus: ENUMS.purchaseStatus[2] }; // 'FAILED'
        await PrismaService.update('offset', offsetId, updatedOffsetData);
        // Throw Error
        throw new AppError(`⚠️ Failed to buy offset for id: ${offsetId}.`, 500);
    }

    /**
     * Handles a successfull Offset Purchase. Updates the Offset Entry with the
     * returned data.
     * 
     * @param {String} offsetId 
     * @param {Number} amount - The amount of money it cost to buy the Offsets
     * @param {String} currency - The currency in which the Offsets had to be paid
     * @returns {Object} - Updated Offset
     */
    async handleSuccessfulPurchase(offsetId, amount, currency) {
        const updatedOffsetData = {
            price: amount,
            currency: currency,
            purchaseStatus: ENUMS.purchaseStatus[1], // 'SUCCESSFULL'
        };
        const updatedOffset = await PrismaService.update('offset', offsetId, updatedOffsetData);
        return updatedOffset;
    }

    /**
     * Make a purchase for a given Offset.
     * 
     * Purchases Offsets from Ecologi and updates the local Offset Data.
     * 
     * @param {Object} offset - Offset Entry to purchase
     * @returns {Object} Updated Offset
     */
    async makePurchase(offset) {
        const { id, offsetKilograms } = offset;
        // Purchase offsets from ecologi
        const response = await this.purchaseCarbonOffsets(id, offsetKilograms);
        // Handle failure
        if (!response || !response.amount || !response.currency) {
            return await this.handleFailedPurchase(id, response);
        }
        // Update local Offset
        const updatedOffset = await this.handleSuccessfulPurchase(id, response.amount, response.currency);
        return updatedOffset;
    }
};

export default new OffsetService();