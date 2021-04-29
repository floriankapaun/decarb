/**
 * Prevents logged in users from seeing guest-only pages
 *
 * @param {Nuxt} context - nuxt context available both on server and client
 * @return {null} returns null
 */
export default (context) => {
    const { store } = context
    // If user is logged in
    if (store.getters['auth/getIsLoggedIn']) {
        return context.redirect('/')
    }
}
