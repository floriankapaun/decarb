import {
    AVERAGE_SECONDS_ON_PAGE,
    BYTE_IN_GB,
    CO2E_PER_WH_GREEN,
    CO2E_PER_WH_GREY,
    DEFAULT_AVERAGE_BYTES,
    ENUMS,
    PERCENTAGE_OF_DATA_LOADED_CACHED,
    PERCENTAGE_OF_ENERGY_IN_DATACENTER,
    PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER,
    USAGE_WH,
    WH_PER_GB,
} from '../config/index.js';
import DomainHostingEmissionService from './DomainHostingEmissionService.js';
import DomainService from './DomainService.js';
import PageViewEmissionService from './PageViewEmissionService.js';
import PrismaService from './PrismaService.js';


/**
 * Handles Carbon Emission Calculations
 * 
 * As mentioned in my bachelor thesis I tried to include additional
 * parameters in my emission calculations to increase their accuracy. 
 * I therefore tried to include the influence of connection type,
 * device type, average time on page and energy type of the hoster in
 * my calculation. However, the data for these additional parameters
 * is sparse, outdated or otherwise unreliable which is why the
 * implemented calculation is rather unsuitable for production use
 * until the scientific background is clarified.
 */
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
            return Math.ceil(bytes * PERCENTAGE_OF_DATA_LOADED_CACHED)
        }
        return Math.ceil(bytes);
    }


    /**
     * Returns connectionType ENUM for effectiveConnection String
     * 
     * @param {String} connection 
     * @returns {String} - ENUMS.deviceType
     */
    getConnectionTypeENUM(connection) {
        if (connection === '4g') return ENUMS.connectionType[3]; // LTE
        if (connection === '3g') return ENUMS.connectionType[2]; // 3G
        return ENUMS.connectionType[0]; // DEFAULT
    }


    /**
     * Returns deviceType ENUM for window size
     * 
     * Average display sizes from Statscounter
     * https://gs.statcounter.com/screen-resolution-stats
     * 
     * @param {Number} windowWidth 
     * @param {Number} windowHeight
     * @returns {String} - ENUMS.deviceType 
     */
    getDeviceTypeENUM(windowWidth, windowHeight) {
        if (
            (windowWidth <= 450 && windowHeight <= 900) ||
            (windowWidth <= 900 && windowHeight <= 450)
        ) {
            return ENUMS.deviceType[1]; // SMARTPHONE
        }
        if (
            (windowWidth <= 840 && windowHeight <= 1150) ||
            (windowWidth <= 1150 && windowHeight <= 840)
        ) {
            return ENUMS.deviceType[2]; // TABLET
        }
        if (windowWidth <= 1440 && windowHeight <= 900) {
            return ENUMS.deviceType[3]; // LAPTOP
        }
        if (windowWidth > 1440 && windowHeight > 900) {
            return ENUMS.deviceType[4]; // DESKTOP
        }
        return ENUMS.deviceType[0]; // DEFAULT
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
        const connection = this.getConnectionTypeENUM(connectionType);
        const downloadWh = bytes * (WH_PER_GB[connection] / BYTE_IN_GB);
        const deviceType = this.getDeviceTypeENUM(windowWidth, windowHeight);
        const usageWh = USAGE_WH[deviceType] * AVERAGE_SECONDS_ON_PAGE;
        return (downloadWh + usageWh);
    }


    /**
     * Calculate Emissions in kilograms by watt-hours and energy type
     * 
     * @param {Number} wh - Watt-hours
     * @param {Boolean} renewable - green energy or not
     * @returns {Object} - Emissions in kilograms
     */
    getEmissionKilograms(wh, renewable) {
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
        let averageBytes = DEFAULT_AVERAGE_BYTES;
        if (pageViewEmissions?.length) {
            const bytes = pageViewEmissions.map((x) => x.byte);
            averageBytes = Math.ceil(bytes.reduce((a, b) => a + b) / bytes.length);
        }
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
