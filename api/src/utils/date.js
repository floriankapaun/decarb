/**
 * Adds a number of days to a JavaScript Date Object
 * 
 * @param {Date} date - JavaScript Date
 * @param {Number} days 
 * 
 * @returns {Date}
 */
export const addDaysToDate = (date, days) => new Date(date.setDate(date.getDate() + days));


/**
 * Returns a copy of a JavaScript Date Object
 * 
 * @param {Date} date - JavaScript Date
 * 
 * @returns {Date} - exact copy
 */
export const copyDate = (date) => new Date(date.getTime());


/**
 * Transforms a JavaScript Date Object into an String (YYYY-MM-DD)
 * 
 * Reference: https://stackoverflow.com/a/23593099
 * 
 * @param {Date} date - JavaScript Date
 * 
 * @returns {String} - YYYY-MM-DD
 */
export const getDateString = (date) => {
    const year = date.getFullYear();
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
};
