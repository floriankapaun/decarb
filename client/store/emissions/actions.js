import { saveFetch } from '@/utils/helpers'

export default {
    fetchAggregation: async (context, { domainId, options }) => {
        const { commit } = context
        commit('setIsLoading', true)
        const response = await saveFetch(
            context,
            'POST',
            `/domains/${domainId}/emissions`,
            options
        )
        if (response?.data) commit('setAggregation', response.data)
        commit('setIsLoading', false)
    },
    fetchHostingEmissions: async (context, domainId) => {
        const { commit } = context
        commit('setIsLoading', true)
        const response = await saveFetch(
            context,
            'GET',
            `/domains/${domainId}/hosting-emissions`
        )
        if (response?.data) commit('setHostingEmissions', response.data)
        commit('setIsLoading', false)
    },
    fetchPageviewEmissions: async (context, { domainId, options }) => {
        const { commit } = context
        commit('setIsLoading', true)
        const response = await saveFetch(
            context,
            'POST',
            `/domains/${domainId}/pages/emissions`,
            options
        )
        if (response?.data) commit('setPageviewEmissions', response.data)
        commit('setIsLoading', false)
    },
}
