import { saveFetch } from '@/utils/helpers'

export default {
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
}
