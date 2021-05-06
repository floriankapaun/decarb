/**
 * Converts JWT TokenExpiredError to AppError
 * 
 * @param {Object} err 
 * @returns {AppError}
 */
const jwtHandleError = (err) => {
    if (err.message === 'jwt expired' && err.expiredAt) {
        return new AppError(`JWT expired. Expiry date: ${err.expiredAt}`, 401);
    }
    return new AppError(err.message, 401);
}


/**
 * Converts input to AppError object
 * 
 * @param {*} err 
 * @returns {AppError}
 */
export default (err) => {
    if (err instanceof AppError) return err;
    if (typeof err === 'string') return new AppError(err);
    if (typeof err === 'object' && err.name === 'TokenExpiredError') {
        return jwtHandleError(err);
    }
    // FIXME: This creates potential for server killing experiences
    console.error('CAUTION: Non-Formatted Error', error);
    return err;
}
