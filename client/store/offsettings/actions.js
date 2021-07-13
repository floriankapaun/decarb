import saveFetch from '@/utils/saveFetch'

export default {
    fetchAggregation: async (context, domainId) => {
        const { commit } = context
        commit('setIsLoading', true)
        const response = await saveFetch(
            context,
            'GET',
            `/domains/${domainId}/offsets/purchased`
        )
        if (response?.data) commit('setAggregation', response.data)
        commit('setIsLoading', false)
    },
}
