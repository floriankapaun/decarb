// Reference: https://dop3ch3f.medium.com/my-modular-approach-to-authentication-in-nuxt-implementation-9208ce9240c4

/**
 * Route Guard Main Method that uses pipe to process each request (through route guards fns) and provide the correct call to redirect based on auth status
 *
 * @param {Nuxt} context - nuxt context available both on server and client
 * @return {null} returns null
 */
export default (context) => {
    const { redirect, route, store } = context
    const user = store.getters['auth/getUser']
    const path = route.fullPath.replace(/\/$/, '') // Remove trailing slash from fullPath

    // If user is not logged in
    // FIXME: This is not secure at all. A user could easily manipulate its store persistance cookie.
    if (!store.getters['auth/getIsLoggedIn']) {
        return redirect('/login')
    }

    // If user logged in, but has no Domains yet
    if (path !== '/dashboard/register-domain' && user && !user.hasDomain) {
        return redirect('/dashboard/register-domain')
    }
}
