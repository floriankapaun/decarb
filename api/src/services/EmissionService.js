import {
    BYTE_IN_GB,
    CO2E_PER_WH_GREEN,
    CO2E_PER_WH_GREY,
    PERCENTAGE_OF_DATA_LOADED_CACHED,
    PERCENTAGE_OF_ENERGY_IN_DATACENTER,
    PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER,
    WH_PER_GB,
} from '../config/index.js';
import DomainHostingEmissionService from './DomainHostingEmissionService.js';
import DomainService from './DomainService.js';
import PageViewEmissionService from './PageViewEmissionService.js';
import PrismaService from './PrismaService.js';

class EmissionService {


    /**
     * Calculates the transferred amount of Bytes
     * 
     * @param {Number} bytes - The uncached amount of Bytes
     * @param {Boolean} uncached - If the PageView was uncached or not
     * @returns {Number} - Transferred amount of Bytes
     */
    getTransferredBytes(bytes, uncached = true) {
        if (!uncached) {
            return bytes * PERCENTAGE_OF_DATA_LOADED_CACHED
        }
        return bytes;
    }


    /**
     * Returns the energy consumed by a PageView in watt-hours
     * 
     * @param {Number} byte - Transferred amount of bytes
     * @param {String} connectionType - Used type of internet connection
     * @param {Number} windowWidth 
     * @param {Number} windowHeight 
     * @returns {Number} - Watt-hours used
     */
    getWh(bytes, connectionType, windowWidth, windowHeight) {
        const downloadWh = bytes * (WH_PER_GB / BYTE_IN_GB)
        // TODO: Multiply by connectionType
        // TODO: Add Device Energy Consumption
        return downloadWh;
    }


    /**
     * Calculate Emissions in kilograms by watt-hours and energy type
     * 
     * @param {Number} wh - Watt-hours
     * @param {Boolean} renewable - green energy or not
     * @returns {Object} - Emissions in kilograms
     */
    getEmissionKilograms(wh, renewable) {
        // TODO: Refactor. Var from Website Carbon Calculator
        if (!renewable) {
            return ((wh * CO2E_PER_WH_GREY) / 1000);
        }
        const whDatacenter = wh * PERCENTAGE_OF_ENERGY_IN_DATACENTER;
        const whElse = wh * PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER;
        return (((whDatacenter * CO2E_PER_WH_GREEN) + (whElse * CO2E_PER_WH_GREY)) / 1000);
    }


    /**
     * Returns aggregated emissions in kilograms of a Domain in time range
     * 
     * @param {String} domainId - ID of Domain
     * @param {DateTime} timeStart - Start of time range
     * @param {DateTime} [timeEnd=now] - End of time range
     * @returns {Object} - Domains Emissions in time range in kilograms
     */
    async getAggregatedEmissions(domainId, timeStart, timeEnd = new Date()) {
        // Get all pageViews for Domain in time range
        const pageViews = await PrismaService.findMany('pageView', {
            select: { wh: true }, // only fetch needed information
            where: {
                page: {
                    domainId: { equals: domainId },
                },
                createdAt: {
                    gte: timeStart ? new Date(timeStart) : undefined,
                    lt: new Date(timeEnd),
                },
            },
        });
        if (!pageViews || !pageViews.length) return { emissionKilograms: 0 };
        // Aggregate watt-hours
        const wattHours = pageViews.map((x) => x.wh).reduce((a, b) => a + b);
        // Get hostingEmissions
        const hostingEmissions = await DomainHostingEmissionService.getCurrent(domainId);
        // Translate to kilograms of CO2e
        const emissionKilograms = this.getEmissionKilograms(wattHours, hostingEmissions.renewableEnergy);
        return { emissionKilograms };
    }


    /**
     * Returns an estimated amount of CO2e produced by a Domain each month in kilograms
     * 
     * @param {String} id - ID of Domain
     * @returns {Object} - Estimated amount of kilograms CO2e produced per Month
     */
    async getInitialEstimation(id) {
        // Calculate the average byte size of all current PageViewEmissions
        const pageViewEmissions = await PageViewEmissionService.getAllCurrentForDomain(id);
        const bytes = pageViewEmissions.map((x) => x.byte);
        const averageBytes = Math.ceil(bytes.reduce((a, b) => a + b) / bytes.length);
        // Extrapolate estimated amount of transferred bytes per month
        const domain = await DomainService.getById(id);
        const extrapolatedBytes = averageBytes * domain.estimatedMonthlyPageViews;
        // Convert to watt-hours while using realistic default values
        const wattHours = this.getWh(extrapolatedBytes, '3g', 1366, 768);
        // Convert to kilograms of emissions
        const hostingEmissions = await DomainHostingEmissionService.getCurrent(id);
        const emissionKilograms = this.getEmissionKilograms(
            wattHours,
            hostingEmissions.renewableEnergy
        );
        return { kilograms: Math.ceil(emissionKilograms) };
    }
}

export default new EmissionService();
