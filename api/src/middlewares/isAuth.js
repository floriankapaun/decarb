import jwt from 'jsonwebtoken';

import { JWT_SECRET_KEY } from '../config';

const getTokenFromHeader = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
}

export default (req, res, next) => {
    const token = getTokenFromHeader(req);
    if (!token) res.status(401).send('Unauthorized: No accessToken provided');
    try {
        req.body.auth = jwt.verify(token, JWT_SECRET_KEY);
        if (!req.body.auth) res.status(401).send('Unauthorized: accessToken validation failed');
        next();
    } catch(error) {
        res.status(401).send(error);
    }
}
