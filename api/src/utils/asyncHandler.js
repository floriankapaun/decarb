/**
 * Wraps a given function inside a promise.
 * Returns a function with three input params which is reponsible for executing the
 * original function passing three params (req, res, next) and catching errors
 *
 * Reference: https://www.acuriousanimal.com/blog/2018/03/15/express-async-middleware
 * 
 * @param {Function} fn 
 * @returns {Function} - returns fn in a Promise
 */
const asyncHandler = (fn) => (req, res, next) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch((err) => next(err));
}

export default asyncHandler;