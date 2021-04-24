/**
 * Convert URL to lowercase, remove prefixes like 'http(s)://'
 * and 'www.' and sufixes like '/', '.htm(l)' or '.php'
 * 
 * @param {String} url
 * 
 * @returns {String}
 */
export const cleanUrl = (url) => {
    return url.toLowerCase().replace(/(^(https?:)?\/?\/?(www.)?|(\/|\.php|\.html?)\/?$)/g, '');
};