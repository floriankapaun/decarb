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
 * Adds a number of minutes to a JavaScript Date Object
 * 
 * @param {Date} date - JavaScript Date
 * @param {Number} minutes 
 * 
 * @returns {Date}
 */
export const addMinutesToDate = (date, minutes) => new Date(date.setMinutes(date.getMinutes() + minutes));


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


/**
 * Transforms a JavaScript Date Object into an Timestamp String (YYYY-MM-DD HH24:MM:SS)
 * 
 * Reference: https://stackoverflow.com/a/23593099
 * 
 * @param {Date} date - JavaScript Date
 * 
 * @returns {String} - YYYY-MM-DD HH24:MM:SS
 */
export const getTimestampString = (date) => {
    const year = date.getFullYear();
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    let hours = `${date.getHours()}`;
    let minutes = `${date.getMinutes()}`;
    let seconds = `${date.getSeconds()}`;

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;
    if (hours.length < 2) hours = `0${hours}`;
    if (minutes.length < 2) minutes = `0${minutes}`;
    if (seconds.length < 2) seconds = `0${seconds}`;
    
    return `${[year, month, day].join('-')} ${[hours, minutes, seconds].join(':')}`;
};
