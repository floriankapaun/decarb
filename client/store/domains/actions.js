import { saveFetch } from '@/utils/helpers'

export default {
    register: async ({ commit, rootGetters }, domainData) => {
        commit('setIsLoading', true)
        const apiBaseUrl = rootGetters.getConfig.API_ENTRYPOINT
        const accessToken = rootGetters['auth/getAccessToken']
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(domainData),
        }
        await saveFetch(`${apiBaseUrl}/domains`, requestOptions)
        commit('setIsLoading', false)
    },
    fetchDomains: async ({ commit, rootGetters }) => {
        commit('setIsLoading', true)
        const apiBaseUrl = rootGetters.getConfig.API_ENTRYPOINT
        const accessToken = rootGetters['auth/getAccessToken']
        const requestOptions = {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
        }
        const data = await saveFetch(`${apiBaseUrl}/domains`, requestOptions)
        if (data) commit('setDomains', data)
        commit('setIsLoading', false)
    },
    fetchUserDomains: async ({ commit, rootGetters }) => {
        commit('setIsLoading', true)
        const apiBaseUrl = rootGetters.getConfig.API_ENTRYPOINT
        const accessToken = rootGetters['auth/getAccessToken']
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
        const data = await saveFetch(
            // TODO: No working api path yet -> build it
            `${apiBaseUrl}/domains`,
            requestOptions
        )
        if (data) commit('setUserDomains', data)
        commit('setIsLoading', false)
    },
}
