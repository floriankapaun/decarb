// Reference: https://dop3ch3f.medium.com/my-modular-approach-to-authentication-in-nuxt-implementation-9208ce9240c4

import { saveRedirect } from '@/utils/helpers'

/**
 * Route Guard Main Method that uses pipe to process each request (through route guards fns) and provide the correct call to redirect based on auth status
 *
 * @param {Nuxt} context - nuxt context available both on server and client
 * @return {null} returns null
 */
export default (context) => {
    const { store } = context
    // If user is not logged in
    if (!store.getters['auth/getIsLoggedIn']) {
        const to = '/login'
        return saveRedirect(to, context)
    }
}
