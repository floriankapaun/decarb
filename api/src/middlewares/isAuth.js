import jwt from 'jsonwebtoken';

import { JWT_SECRET_KEY } from '../config';

const getTokenFromHeader = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
}

export default (req, res, next) => {
    const token = getTokenFromHeader(req);
    if (!token) {
        const message = 'Unauthorized: No accessToken provided';
        return res.status(401).json({ message });
    }
    try {
        req.authData = jwt.verify(token, JWT_SECRET_KEY);
        if (!req.authData) {
            const message = 'Unauthorized: accessToken validation failed';
            return res.status(401).json({ message });
        }
        next();
    } catch(error) {
        return res.status(401).json(error);
    }
}
