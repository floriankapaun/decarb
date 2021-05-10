import { saveFetch } from '@/utils/helpers'

export default {
    login: async (context, loginCredentials) => {
        const { commit } = context
        commit('setIsLoading', true)
        const data = await saveFetch(
            context,
            'POST',
            '/auth/login',
            loginCredentials
        )
        const isLoggedIn = !!(
            data &&
            data.data &&
            data.data.accessToken &&
            data.data.accessTokenExpiry
        )
        commit('setIsLoggedIn', isLoggedIn)
        if (data && data.data) {
            commit('setAccessToken', data.data.accessToken)
            commit('setAccessTokenExpiry', data.data.accessTokenExpiry)
        }
        commit('setIsLoading', false)
    },
    fetchUser: async (context) => {
        const { commit } = context
        commit('setIsLoading', true)
        const data = await saveFetch(context, 'GET', '/auth/user')
        if (data && data.data) {
            commit('setUser', data.data)
        }
        commit('setIsLoading', false)
    },
    logout: async (context) => {
        const { commit } = context
        commit('setIsLoading', true)
        const user = context.rootGetters['auth/getUser']
        if (user && user.email) {
            const data = await saveFetch(context, 'POST', '/auth/logout', {
                email: user.email,
            })
            if (data && data.data) {
                commit('setIsLoggedIn', false)
                commit('setAccessToken', null)
                commit('setAccessTokenExpiry', null)
            }
        }
        commit('setIsLoading', false)
    },
}
