import { saveFetch } from '@/utils/helpers'

export default {
    register: async (context, domainData) => {
        const { commit } = context
        commit('setIsLoading', true)
        await saveFetch(context, 'POST', '/domains', domainData)
        commit('setIsLoading', false)
    },
    fetchDomains: async (context) => {
        const { commit } = context
        commit('setIsLoading', true)
        const data = await saveFetch(context, 'GET', '/domains')
        if (data && data.data) commit('setDomains', data.data)
        commit('setIsLoading', false)
    },
    fetchUserDomains: async (context, userId) => {
        const { commit } = context
        commit('setIsLoading', true)
        const data = await saveFetch(context, 'GET', `/users/${userId}/domains`)
        if (data && data.data) commit('setUserDomains', data.data)
        commit('setIsLoading', false)
    },
    setSelectedDomain: ({ commit }, domain) => {
        commit('setSelectedDomain', domain)
    },
    verifyDomainOwnership: async (context, domainId) => {
        const { commit } = context
        commit('setIsLoading', true)
        await saveFetch(
            context,
            'POST',
            `/domains/${domainId}/ownership-verification`
        )
        commit('setIsLoading', false)
    },
}
