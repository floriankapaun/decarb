import AppError from './AppError.js';

/**
 * Converts AppError to specified return format
 * 
 * @param {Object} payload 
 * @returns {Object}
 */
const formatAppError = (payload) => {
    const data = { ok: false };
    // Does not return payload.stack which is fine.
    // TODO: Log payload.stack for insights on the server side
    return Object.assign(data, payload);
};


/**
 * Converts Object to specified return format
 * 
 * @param {Object} payload 
 * @returns {Object}
 */
const formatResponse = (payload) => {
    return { ok: true, data: payload };
};


/**
 * Sends a response to the client
 * 
 * @param {Object} res 
 * @param {Object} payload 
 * @param {Number} code - HTTP response status code
 * 
 * @returns {Response} - JSON Object
 */
export default (res, payload, code = 200) => {
    // If payload is Error, but no AppError, create an AppError from payload
    if (payload instanceof Error && !(payload instanceof AppError)) {
        payload = new AppError(payload.message, payload.code, payload.stack);
    }
    // Create response for AppErrors
    if (payload instanceof AppError) {
        // Overwrite param code with payload code if given
        const statusCode = payload.code ?? code;
        return res.status(statusCode).json(formatAppError(payload))
    }
    // Response for Non-Errors
    return res.status(code).json(formatResponse(payload));
};