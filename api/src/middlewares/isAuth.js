import jwt from 'jsonwebtoken';

import { JWT_SECRET_KEY } from '../config';
import AppError from '../utils/AppError';


/**
 * Retrieves and returns Bearer Token from Request Object
 * 
 * @param {Object} req 
 * @returns {String}
 */
const getTokenFromHeader = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
}


/**
 * Checks if request provided valid access token.
 * Throws an AppError if not.
 */
export default (req, res, next) => {
    try {
        const token = getTokenFromHeader(req);
        if (!token) {
            const message = 'Unauthorized: No accessToken provided';
            throw new AppError(message, 401);
        }
        req.authData = jwt.verify(token, JWT_SECRET_KEY);
        if (!req.authData) {
            const message = 'Unauthorized: accessToken validation failed';
            throw new AppError(message, 401);
        }
        next();
    } catch(err) {
        next(err)
    }
}
