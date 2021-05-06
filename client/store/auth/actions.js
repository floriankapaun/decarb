import { saveFetch } from '@/utils/helpers'

export default {
    login: async ({ commit, rootGetters }, loginCredentials) => {
        commit('setIsLoading', true)
        const apiBaseUrl = rootGetters.getConfig.API_ENTRYPOINT
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginCredentials),
        }
        const data = await saveFetch(`${apiBaseUrl}/auth/login`, requestOptions)
        const isLoggedIn = !!(
            data &&
            data.data &&
            data.data.accessToken &&
            data.data.accessTokenExpiry
        )
        commit('setIsLoggedIn', isLoggedIn)
        if (data) {
            commit('setAccessToken', data.data.accessToken)
            commit('setAccessTokenExpiry', data.data.accessTokenExpiry)
        }
        commit('setIsLoading', false)
    },
    fetchUser: async ({ commit, rootGetters }, accessToken) => {
        commit('setIsLoading', true)
        const apiBaseUrl = rootGetters.getConfig.API_ENTRYPOINT
        const requestOptions = {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
        }
        const data = await saveFetch(`${apiBaseUrl}/auth/user`, requestOptions)
        if (data && data.data) {
            commit('setUser', data.data)
        }
        commit('setIsLoading', false)
    },
    logout: async ({ commit, rootGetters }) => {
        commit('setIsLoading', true)
        const apiBaseUrl = rootGetters.getConfig.API_ENTRYPOINT
        const user = rootGetters['auth/getUser']
        if (user && user.email) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email }),
            }
            const data = await saveFetch(
                `${apiBaseUrl}/auth/logout`,
                requestOptions
            )
            if (data) {
                commit('setIsLoggedIn', false)
                commit('setAccessToken', null)
                commit('setAccessTokenExpiry', null)
            }
        }
        commit('setIsLoading', false)
    },
}
