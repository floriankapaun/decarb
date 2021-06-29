import createAppError from '../utils/createAppError.js';
import sendResponse from '../utils/sendResponse.js';


/**
 * Custom Error Middleware
 * 
 * Handles errors passed to next()
 * 
 * Reference: https://expressjs.com/en/guide/error-handling.html
 */
export default (err, req, res, next) => {
    const appError = createAppError(err);
    return sendResponse(res, appError);
};