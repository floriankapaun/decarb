import PrismaService from '../services/PrismaService';
import AppError from '../utils/AppError';

export default async (req, res, next) => {
    try {
        const userId = req.authData['x-eco-web-user-id'];
        const parameters = { id: userId };
        const options = { include: { domains: true } };
        const user = await PrismaService.findUnique('user', parameters, options);
        if (!user) {
            const message = `Can't find user with id: ${userId}`;
            throw new AppError(message, 401);
        }
        req.currentUser = user;
        return next();
    } catch (err) {
        return next(err);
    }
}