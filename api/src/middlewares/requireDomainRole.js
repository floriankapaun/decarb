import { ENUMS } from '../config/index.js';
import AppError from '../utils/AppError.js';


/**
 * Makes sure a user meets minimum role requirement for domain
 * 
 * Role refers to DomainUser relation
 */
export default (minimumRoleIndex) => async (req, res, next) => {
    try {
        const domainId = req.params.id || req.body.domainId;
        const domainUser = req.currentUser.domains.find((domain) => domain.domainId === domainId);
        if (!domainUser) {
            const message = `User has no access to this domain.`;
            throw new AppError(message, 401);
        }
        // If no minimumRoleIndex is specified, any kind of
        // domainRole is accepted
        if (!minimumRoleIndex) return next();
        // Find domainUserRoleIndex
        const domainUserRoleIndex = ENUMS.role.findIndex((role) => role === domainUser.role);
        // Permissions decline with an increasing roleIndex.
        // A roleIndex of `0` therefore has the most permissions.
        if (minimumRoleIndex < domainUserRoleIndex) {
            const message = `User role ${domainUser.role} is not enough to do this.`
            throw new AppError(message, 401);
        }
        return next();
    } catch (err) {
        return next(err);
    }
};
