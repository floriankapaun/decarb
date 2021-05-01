import { saveFetch } from '@/utils/helpers'

export default {
    register: async ({ commit, rootGetters }, domainData) => {
        commit('setIsLoading', true)
        const accessToken = rootGetters['auth/getAccessToken']
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(domainData),
        }
        await saveFetch(`http://localhost:4000/api/v1/domains`, requestOptions)
        commit('setIsLoading', false)
    },
    fetchDomains: async ({ commit, rootGetters }) => {
        commit('setIsLoading', true)
        const accessToken = rootGetters['auth/getAccessToken']
        const requestOptions = {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
        }
        const data = await saveFetch(
            `http://localhost:4000/api/v1/domains`,
            requestOptions
        )
        if (data) commit('setDomains', data)
        commit('setIsLoading', false)
    },
    fetchUserDomains: async ({ commit, rootGetters }) => {
        commit('setIsLoading', true)
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
            `http://localhost:4000/api/v1/domains`,
            requestOptions
        )
        if (data) commit('setUserDomains', data)
        commit('setIsLoading', false)
    },
}
