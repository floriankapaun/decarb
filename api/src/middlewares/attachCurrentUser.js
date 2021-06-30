import UserService from '../services/UserService.js';
import AppError from '../utils/AppError.js';


/**
 * Attach data about the current User and his/her Domains to the
 * req Object ('req.currentUser'). Depends on isAuth middleware.
 */
export default async (req, res, next) => {
    try {
        const userId = req.authData?.['x-decarb-user-id'];
        if (!userId) {
            throw new AppError(
                'Missing isAuth middleware on Route',
                500
            );
        }
        req.currentUser = await UserService.getIncludingDomains(userId);
        return next();
    } catch (err) {
        return next(err);
    }
}