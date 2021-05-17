import Notification from './Notification'

const handleError = async (error) => {
    if (error.json && typeof error.json === 'function') {
        error = await error.json()
    }
    const errorMessage = error && error.message ? error.message : error
    const errorNotification = new Notification({
        title: errorMessage,
        type: 'error',
    })
    if (process.client) {
        window.$nuxt.$store.dispatch(
            'notifications/addNotification',
            errorNotification
        )
    }
    // TODO: Create Notifications for Server-Side Errors
}

export const saveFetch = async (
    context,
    requestMethod = 'POST',
    path,
    bodyData
) => {
    const { rootGetters } = context
    const apiBaseUrl = rootGetters.getConfig.API_ENTRYPOINT
    let accessToken = rootGetters['auth/getAccessToken']
    const accessTokenExpiry = rootGetters['auth/getAccessTokenExpiry']
    // If access Token is expired, refresh it first
    if (
        accessToken &&
        accessTokenExpiry &&
        new Date(accessTokenExpiry) < new Date() &&
        path !== '/auth/refresh-token' &&
        path !== '/auth/logout'
    ) {
        if (process.client) {
            await window.$nuxt.$store.dispatch('auth/refreshToken')
        } else {
            // Third parameter enables dispatching on root level
            await context.dispatch('auth/refreshToken', null, { root: true })
        }
        accessToken = rootGetters['auth/getAccessToken']
    }
    const requestOptions = {
        method: requestMethod,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(bodyData),
    }
    return fetch(`${apiBaseUrl}${path}`, requestOptions)
        .then((response) => {
            if (!response.ok) throw response
            return response.json()
        })
        .catch((error) => handleError(error))
}
