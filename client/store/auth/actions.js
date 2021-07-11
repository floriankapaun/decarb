import * as Cookies from 'js-cookie'
import cookie from 'cookie'

import saveFetch from '@/utils/saveFetch'

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
    // This Action mustn't be an arrow function because we need access to 'this'
    async refreshToken(context) {
        const { commit } = context
        commit('setIsLoading', true)
        const user = context.rootGetters['auth/getUser']
        if (!user?.email) return commit('setIsLoading', false)
        // For a reason I didn't understand so far, on server side requests, Nuxt is not
        // sending the 'refreshToken' cookie it receives within the 'req' Object from the
        // Client to the API. To make refreshing tokens work on server side, I'm parsing
        // the cookies and sending the clients 'refreshToken' in the fetchs body.
        // See: https://stackoverflow.com/questions/67614885/nuxt-vuex-helper-not-sending-client-cookies-to-api
        let refreshToken
        if (process?.server && this?.app?.context?.req?.headers?.cookie) {
            const parsedCookies = cookie.parse(
                this.app.context.req.headers.cookie
            )
            refreshToken = parsedCookies?.refreshToken
        }
        const data = await saveFetch(context, 'POST', '/auth/refresh-token', {
            email: user.email,
            refreshToken,
        })
        if (data?.data) {
            commit('setAccessToken', data.data.accessToken)
            commit('setAccessTokenExpiry', data.data.accessTokenExpiry)
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
                // Clear Vuex Persistance Cookie as well
                // FIXME: Remove those logs, or finish debugging
                console.log('VUEX CONTEXT PROCESS', context.process)
                if (context.process.client) {
                    console.log('THIS IS THE CLIENT SIDE')
                    Cookies.remove(
                        context.rootGetters.getConfig.VUEX_PERSISTANCE_KEY
                    )
                } else {
                    console.log('THIS IS THE SERVER SIDE')
                }
            }
        }
        commit('setIsLoading', false)
    },
}
