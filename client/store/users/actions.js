import { saveFetch } from '@/utils/helpers'

export default {
    register: async ({ commit, rootGetters }, userData) => {
        commit('isLoading', true)
        const apiBaseUrl = rootGetters.getConfig.API_ENTRYPOINT
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        }
        const data = await saveFetch(`${apiBaseUrl}/users`, requestOptions)
        if (data) commit('user', data)
        commit('isLoading', false)
    },
    verify: async ({ commit, rootGetters }, { userId, verificationCode }) => {
        commit('isLoading', true)
        const apiBaseUrl = rootGetters.getConfig.API_ENTRYPOINT
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ verificationCode }),
        }
        const data = await saveFetch(
            `${apiBaseUrl}/users/${userId}/verification`,
            requestOptions
        )
        if (data) commit('user', data)
        commit('isLoading', false)
    },
    setPassword: async ({ commit, rootGetters }, { userId, password }) => {
        commit('isLoading', true)
        const apiBaseUrl = rootGetters.getConfig.API_ENTRYPOINT
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        }
        const data = await saveFetch(
            `${apiBaseUrl}/users/${userId}/password`,
            requestOptions
        )
        if (data) commit('user', data)
        commit('isLoading', false)
    },
}
