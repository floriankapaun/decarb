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
        if (data && data.data) {
            commit('setUserDomains', data.data)
            commit('setSelectedDomainIfUndefined', data.data)
        }
        commit('setIsLoading', false)
    },
    setSelectedDomain: ({ commit }, domain) => {
        commit('setSelectedDomain', domain)
    },
    updateDomain: async (context, { domainId, domainData }) => {
        const { commit } = context
        commit('setIsLoading', true)
        await saveFetch(context, 'PUT', `/domains/${domainId}`, domainData)
        commit('setIsLoading', false)
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
    fetchDomainPages: async (context, domainId) => {
        const { commit } = context
        commit('setIsLoading', true)
        const data = await saveFetch(
            context,
            'GET',
            `/domains/${domainId}/pages`
        )
        if (data && data.data) {
            commit('setDomainPages', data.data)
        }
        commit('setIsLoading', false)
    },
    fetchDomainPublicProfile: async (context, domainUrl) => {
        const { commit } = context
        commit('setIsLoading', true)
        const data = await saveFetch(
            context,
            'GET',
            `/domains/${domainUrl}/profile`
        )
        if (data && data.data) {
            commit('setDomainPublicProfile', data.data)
        }
        commit('setIsLoading', false)
    },
    fetchEmissionEstimation: async (context, domainId) => {
        const { commit } = context
        commit('setIsLoading', true)
        const response = await saveFetch(
            context,
            'GET',
            `/domains/${domainId}/emission-estimation`
        )
        if (response?.data?.kilograms) {
            commit('setEmissionEstimation', {
                id: domainId,
                kilograms: response.data.kilograms,
            })
        }
        commit('setIsLoading', false)
    },
}
