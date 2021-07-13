import saveFetch from '@/utils/saveFetch'

export default {
    fetchViewsPerDay: async (context, { domainId, options }) => {
        const { commit } = context
        commit('setIsLoading', true)
        const response = await saveFetch(
            context,
            'POST',
            `/domains/${domainId}/views/day`,
            options
        )
        if (response?.data) {
            commit('setViewsPerDay', response.data)
        }
        commit('setIsLoading', false)
    },
    fetchViewsPerPage: async (context, { domainId, options }) => {
        const { commit } = context
        commit('setIsLoading', true)
        const response = await saveFetch(
            context,
            'POST',
            `/domains/${domainId}/views`,
            options
        )
        if (response?.data) {
            commit('setViewsPerPage', response.data)
        }
        commit('setIsLoading', false)
    },
}
