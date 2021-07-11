import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

/**
 * Persist the Vuex State inside a Cookie to prevent
 * loosing it on page reloads and to make it available
 * on the Nuxt Server as well.
 */
export default ({ store, req, isDev }) => {
    createPersistedState({
        key: store.$config.VUEX_PERSISTANCE_KEY,
        paths: [
            'auth.isLoggedIn',
            'auth.accessToken',
            'auth.accessTokenExpiry',
            'auth.user',
            'domains.selectedDomain',
            'notifications',
        ],
        storage: {
            getItem: (key) => {
                // See https://nuxtjs.org/guide/plugins/#using-process-flags
                if (!process.server) return Cookies.get(key)
                if (!req.headers.cookie) return false
                const parsedCookies = cookie.parse(req.headers.cookie)
                return parsedCookies[key]
            },
            // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
            setItem: (key, value) => {
                return Cookies.set(key, value, {
                    expires: 365,
                    secure: !isDev,
                })
            },
            removeItem: (key) => Cookies.remove(key),
        },
    })(store)
}
