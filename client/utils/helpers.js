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
