import PrismaService from '../services/PrismaService';

export default async (req, res, next) => {
    const userId = req.authData['x-eco-web-user-id'];
    const parameters = { id: userId };
    const options = { include: { domains: true } };
    const user = await PrismaService.findUnique('user', parameters, options);
    if (!user) {
        const message = `Can't find user with id: ${userId}`;
        return res.status(401).json({ message });
    }
    req.currentUser = user;
    return next();
}