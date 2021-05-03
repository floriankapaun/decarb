import { saveFetch } from '@/utils/helpers'

export default {
    login: async ({ commit }, loginCredentials) => {
        commit('setIsLoading', true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginCredentials),
        }
        const data = await saveFetch(
            `http://localhost:4000/api/v1/auth/login`,
            requestOptions
        )
        const isLoggedIn = !!(
            data &&
            data.accessToken &&
            data.accessTokenExpiry
        )
        commit('setIsLoggedIn', isLoggedIn)
        if (data) {
            commit('setAccessToken', data.accessToken)
            commit('setAccessTokenExpiry', data.accessTokenExpiry)
        }
        commit('setIsLoading', false)
    },
    fetchUser: async ({ commit }, accessToken) => {
        commit('setIsLoading', true)
        const requestOptions = {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
        }
        const data = await saveFetch(
            `http://localhost:4000/api/v1/auth/user`,
            requestOptions
        )
        if (data) {
            commit('setUser', data)
        }
        commit('setIsLoading', false)
    },
    logout: async ({ commit, rootGetters }) => {
        commit('setIsLoading', true)
        const user = rootGetters['auth/getUser']
        if (user && user.email) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email }),
            }
            const data = await saveFetch(
                `http://localhost:4000/api/v1/auth/logout`,
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
