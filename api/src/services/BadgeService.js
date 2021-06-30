import { fileURLToPath } from 'url';
import path from 'path';

import { ENUMS, PROJECT_SLUG } from '../config/index.js';
import AppError from '../utils/AppError.js';

/**
 * Handles Badges
 */
class BadgeService {

    /**
     * Validates the input type and returns default value if undefined
     * 
     * @param {String} type - ENUM BadgeType
     * @returns {String} - valid ENUM BadgeType
     */
    validateType(type) {
        if (type === undefined) {
            return ENUMS.badgeType[0];
        }
        if (!ENUMS.badgeType.includes(type)) {
            throw new AppError(`"${type}" is not a valid badge type.`, 400);
        }
        return type;
    }

    /**
     * Validates the input colorscheme and returns default value if undefined
     * 
     * @param {String} colorscheme - ENUM BadgeColorscheme
     * @returns {String} - valid ENUM BadgeColorscheme
     */
    validateColorscheme(colorscheme) {
        if (colorscheme === undefined) {
            return ENUMS.badgeColorscheme[0];
        }
        if (!ENUMS.badgeColorscheme.includes(colorscheme)) {
            throw new AppError(`"${colorscheme}" is not a valid badge colorscheme.`, 400);
        }
        return colorscheme;
    }

    /**
     * Returns absolut path of Badge .svg
     * 
     * @param {String} type - ENUM BadgeType
     * @param {String} colorscheme - ENUM BadgeColorscheme
     * @param {String} domainId - Domain Id
     * @returns {String} - path to Badge .svg file
     */
    get(type, colorscheme, domainId) {
        // Validate inputs
        const validType = this.validateType(type).toLowerCase();
        const validColorscheme = this.validateColorscheme(colorscheme).toLowerCase();
        // TODO: Implement dynamic badges with domain specific information
        // const validDomainId = ...

        // Return absolute file path
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        return path.resolve(
            __dirname,
            `../../public/img/badge/${validType}/${PROJECT_SLUG}-badge-${validColorscheme}.svg`
        );
    }
}

export default new BadgeService();