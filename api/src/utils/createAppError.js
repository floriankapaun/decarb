import pkg from '@prisma/client';
const { Prisma } = pkg;

import AppError from './AppError.js';

/**
 * Converts JWT TokenExpiredError to AppError
 * 
 * @param {Object} err 
 * @returns {AppError}
 */
const handleJwtError = (err) => {
    if (err.message === 'jwt expired' && err.expiredAt) {
        return new AppError(`JWT expired. Expiry date: ${err.expiredAt}`, 401);
    }
    return new AppError(err.message, 401);
}


/**
 * Converts PrismaClientKnownRequestError to AppError
 * 
 * Reference: https://www.prisma.io/docs/reference/api-reference/error-reference/
 * 
 * @param {Object} err 
 * @returns {AppError}
 */
const handlePrismaClientKnownRequestError = (err) => {
    if (err.code === 'P2002') {
        console.log('Request returned a unique constraint violation.');
    }
    return new AppError(`${err.code}: ${err.message}`, 500);
}


/**
 * Converts input to AppError object
 * 
 * @param {*} err 
 * @returns {AppError}
 */
export default (err) => {
    // TODO: Add more Error Types to Convert them properly
    if (err instanceof AppError) return err;
    if (typeof err === 'string') return new AppError(err);
    if (typeof err === 'object' && err.name === 'TokenExpiredError') {
        return handleJwtError(err);
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return handlePrismaClientKnownRequestError(err);
    }
    console.error('CAUTION: Non-Formatted Error', err);
    return err;
}
