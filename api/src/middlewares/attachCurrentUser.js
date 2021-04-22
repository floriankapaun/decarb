import PrismaService from '../services/PrismaService';

export default async (req, res, next) => {
    const userId = req.authData['x-eco-web-user-id'];
    const parameters = { id: userId };
    const options = { include: { domains: true } };
    const user = await PrismaService.findUnique('user', parameters, options);
    if (!user) {
        res.status(401).send(`Can't find user with id: ${userId}`).end();
    }
    req.currentUser = user;
    return next();
}