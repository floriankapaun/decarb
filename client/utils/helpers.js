// import store from '@/store/alerts'

const handleError = (error) => {
    // const errorStatus = error && error.status ? error.status : error
    const errorMessage = error && error.message ? error.message : error
    console.error(errorMessage)
    // store.dispatch('alerts/set', 'error', errorMessage)
}

// const prepareErrorMessage = (status) => {
//     switch (status) {
//         case 401:
//         return 'Nope, go away'
//     case 422:
//         return 'Unprosomething entity'
//     case 404:
//         return "You're lost"
//     case 405:
//         return 'Read the manual'
//         default:
//         return 'Error, please try again later'
//     }
// }

export const saveFetch = (url, options) =>
    fetch(url, options)
        .then((response) => {
            if (!response.ok) throw response
            return response.json()
        })
        .catch((error) => handleError(error))

/**
 * Returns if a and b are the same url
 *
 * @param {String} a - url string
 * @param {String} b - url string
 * @returns {Boolean} - are a and b the same url?
 */
export const isSameURL = (a, b) => a.split('?')[0] === b.split('?')[0]

/**
 * Redirect users and prevent redirect loops
 *
 * @param {string} to - path to redirect to
 * @param {Nuxt} context
 */
export const saveRedirect = (to, context) => {
    // Prevent redirect loop
    if (process.client && isSameURL(to, context.from.path)) return
    return context.redirect(to)
}
