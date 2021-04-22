/**
 * Removes prefixes like 'http(s)://' and 'www.' from URLs and makes
 * sure they are lowercase.
 * 
 * @param {String} url
 * 
 * @returns {String}
 */
export const cleanUrl = (url) => {
    return url.toLowerCase().replace(/^(https?:|)\/\/(www.)?/, '');
};