import { saveFetch } from '@/utils/helpers'

export default {
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
            `${apiBaseUrl}/subscriptions/create-checkout-session`,
            requestOptions
        )
        if (data && data.data) commit('setCheckoutSessionId', data.data)
        commit('setIsLoading', false)
    },
}
