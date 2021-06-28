import AppError from '../utils/AppError.js';
import { cleanUrl } from '../utils/url.js';
import EmissionService from './EmissionService.js';
import PageService from './PageService.js';
import PageViewEmissionService from './PageViewEmissionService.js';
import PrismaService from './PrismaService.js';

/**
 * Controls the 'PageView' Entity
 */
class PageViewService {

    
    /**
     * Validates data of a PageView
     * 
     * @param {Object} data - data about a PageView
     * @param {String} [data.p] - page url
     * @param {(String|Number)} [data.w] - window width
     * @param {(String|Number)} [data.h] - window height
     * @param {String} [data.c] - connection type
     * @param {(String|Boolean)} [data.f] - uncached visit?
     * @returns {Object} - validated data object
     */
    validatePageViewData(data) {
        if (!data.p) throw new AppError(`No pageUrl ('p') provided`, 400);
        if (typeof data.p === 'string') data.p = cleanUrl(data.p);
        if (typeof data.w === 'string') data.w = parseInt(data.w);
        if (typeof data.h === 'string') data.h = parseInt(data.h);
        if (typeof data.f === 'string') data.f = data.f === 'true';
        return data;
    }


    /**
     * Validates the origin of a PageView registration
     * 
     * @param {String} pageUrl - cleaned pageUrl of the PageView to register
     * @param {String} origin - where the request to register that PageView came from
     * @returns 
     */
    validateOrigin(pageUrl, origin) {
        if (!origin) throw new AppError('No origin provided', 400);
        // To prevent malicious PageView registrations a requests Origin must match 
        // the same domain which it tries to register a PageView for. To ensure this,
        // clean the given Origin URL string...
        const requestOrigin = cleanUrl(origin);
        // ...and confirm matching.
        if (!pageUrl.startsWith(requestOrigin)) {
            throw new AppError(`Wrong origin. "${pageUrl}" is sent from "${requestOrigin}".`, 400);
        }
        return true;
    }


    /**
     * Registers a PageView if inputs are valid
     * 
     * @param {Object} data - data about the PageView
     * @param {String} origin - where the request to register that PageView came from
     * @returns 
     */
    async register(data, origin) {
        // Validate inputs
        const validData = this.validatePageViewData(data);
        const pageUrl = cleanUrl(validData.p);
        this.validateOrigin(pageUrl, origin);
        // Get Page data
        const page = await PageService.findOrCreate(pageUrl);
        // Get Pages PageViewEmission
        const pageViewEmission = await PageViewEmissionService.findOrCreate(page);
        // Calculate amount of transferred bytes and used energy (watthours)
        const byte = EmissionService.getDownloadedBytes(pageViewEmission.byte, data.f);
        const wh = EmissionService.getWh(byte, data.c, data.w, data.h);
        // Register the new PageView
        const pageViewData = {
            pageId: page.id,
            pageViewEmissionId: pageViewEmission.id,
            windowWidth: data.w,
            windowHeight: data.h,
            connectionType: data.c,
            uncachedVisit: data.f,
            byte,
            wh,
        };
        const newPageView = await PrismaService.create('pageView', pageViewData);
        if (newPageView) return newPageView;
        throw new AppError(`Couldn't register PageView`, 500);
    }
};

export default new PageViewService();
