import { saveFetch } from '@/utils/helpers'

export default {
    createSubscription: async (context, subscriptionData) => {
        const { commit } = context
        commit('setIsLoading', true)
        const data = await saveFetch(
            context,
            'POST',
            '/subscriptions',
            subscriptionData
        )
        if (data && data.data) commit('setSubscription', data.data)
        commit('setIsLoading', false)
    },
    createCheckoutSession: async (context, checkoutData) => {
        const { commit } = context
        commit('setIsLoading', true)
        const data = await saveFetch(
            context,
            'POST',
            '/stripe/create-checkout-session',
            checkoutData
        )
        if (data && data.data) commit('setCheckoutSessionId', data.data)
        commit('setIsLoading', false)
    },
    createPortalSession: async (context, portalData) => {
        const { commit } = context
        commit('setIsLoading', true)
        const data = await saveFetch(
            context,
            'POST',
            '/stripe/customer-portal',
            portalData
        )
        if (data && data.data) commit('setPortalSessionUrl', data.data)
        commit('setIsLoading', false)
    },
}
