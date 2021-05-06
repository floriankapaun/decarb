/**
 * Used to create uniform app Errors
 */
class AppError extends Error {

    /**
     * Constructor for AppError
     * 
     * @param {String} message
     * @param {Number} [code=500] - HTTP response status code
     * @param {String} [stack=undefined] - Error Stack
     */
    constructor(message, code = 500, stack = undefined) {
        super();
        this.message = message;
        this.code = code;
        // Only add the stack property if defined in constructor params
        if (stack) this.stack = stack;
    }
}

export default AppError;
