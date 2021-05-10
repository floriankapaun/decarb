import { saveFetch } from '@/utils/helpers'

export default {
    createSubscription: async ({ commit, rootGetters }, subscriptionData) => {
        commit('setIsLoading', true)
        const apiBaseUrl = rootGetters.getConfig.API_ENTRYPOINT
        const accessToken = rootGetters['auth/getAccessToken']
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscriptionData),
        }
        const data = await saveFetch(
            `${apiBaseUrl}/subscriptions/`,
            requestOptions
        )
        console.log(data)
        if (data && data.data) commit('setSubscription', data.data)
        commit('setIsLoading', false)
    },
    createCheckoutSession: async ({ commit, rootGetters }, checkoutData) => {
        commit('setIsLoading', true)
        const apiBaseUrl = rootGetters.getConfig.API_ENTRYPOINT
        const accessToken = rootGetters['auth/getAccessToken']
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkoutData),
        }
        const data = await saveFetch(
            `${apiBaseUrl}/stripe/create-checkout-session`,
            requestOptions
        )
        if (data && data.data) commit('setCheckoutSessionId', data.data)
        commit('setIsLoading', false)
    },
}
