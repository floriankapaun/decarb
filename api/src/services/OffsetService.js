import fetch from 'node-fetch';
import { ECOLOGI_API_ENTRYPOINT, ECOLOGI_API_KEY, MODE } from '../config/index.js';
import PrismaService from './PrismaService.js';

class OffsetService {
    

    async createOffset(domainId) {
        
        const options = { orderBy: { createdAt: 'desc' } };
        const subscription = await PrismaService.findFirst('subscription', { domainId }, options);
        // 1. Decide on offsetType
        // 2. Create Offset (in DB)
        // 3. Get data needed
        // 4. Purchase offset
        // 5. Update Offset (in DB)
        // 6. Return
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
    async purchaseCarbonOffsets(offsetId, number, units = 'KG', test = false) {
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
        });
    }

    /**
     * Purchase Trees from Ecologi
     * 
     * Reference: https://docs.ecologi.com/docs/public-api-docs/API/Impact-API.v1.yaml/paths/~1impact~1trees/post
     * 
     * @param {UUID} offsetId - from database used as Idempotency-Key
     * @param {Number} number - the number of trees to purchase
     * @param {String} name - the "funded by" name for these trees
     * @param {Boolean} test - whether this is a test or not
     * 
     * @returns {Object} - ecologi api response
     */
    async purchaseTrees(offsetId, number, name = null, test = false) {
        // Validate inputs before making a request
        if (typeof number !== 'number') throw('🚫 You have to provide a number. Provided: ', number);
        if (number <= 0 || number >= 250000) throw('🚫 Number of trees must be between 1 and 250.000. Provided: ', number);
        if (typeof name !== 'string' || name === undefined || name === null) {
            throw('🚫 You have to provide a string or \'null\' for \'name\'. Provided: ', name);
        }
        // Undefined is not allowed in the request
        if (name === undefined) name = null;

        return await fetch(`${ECOLOGI_API_ENTRYPOINT}/impact/trees`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${ECOLOGI_API_KEY}`,
                'Content-Type': 'application/json',
                'Idempotency-Key': offsetId,
            },
            body: JSON.stringify({
                number,
                name,
                test: MODE !== 'production' || test ? true : false,
            }),
        });
    }
};

export default new OffsetService();