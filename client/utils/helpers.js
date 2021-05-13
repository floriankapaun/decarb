import { actions } from '@/store/index'
import Notification from './Notification'

const handleError = async (error) => {
    if (error.json && typeof error.json === 'function') {
        error = await error.json()
    }
    const errorMessage = error && error.message ? error.message : error
    console.error(errorMessage)
    const errorNotification = new Notification({
        title: errorMessage,
        type: 'error',
    })
    actions.addDashboardNotification(errorNotification)
}

export const saveFetch = async (
    context,
    requestMethod = 'POST',
    path,
    bodyData
) => {
    const { rootGetters } = context
    const apiBaseUrl = rootGetters.getConfig.API_ENTRYPOINT
    const accessToken = rootGetters['auth/getAccessToken']
    const accessTokenExpiry = rootGetters['auth/getAccessTokenExpiry']
    // If access Token is expired, refresh it first
    if (
        accessToken &&
        accessTokenExpiry &&
        new Date(accessTokenExpiry) < new Date() &&
        path !== '/auth/refresh-token'
    ) {
        await actions.refreshToken(context)
    }
    const requestOptions = {
        method: requestMethod,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
    }
    return fetch(`${apiBaseUrl}${path}`, requestOptions)
        .then((response) => {
            if (!response.ok) throw response
            return response.json()
        })
        .catch((error) => handleError(error))
}
