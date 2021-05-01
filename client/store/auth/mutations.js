export default {
    setIsLoading: (state, isLoading) => (state.isLoading = isLoading),
    setIsLoggedIn: (state, isLoggedIn) => (state.isLoggedIn = isLoggedIn),
    setAccessToken: (state, accessToken) => (state.accessToken = accessToken),
    setAccessTokenExpiry: (state, accessTokenExpiry) => {
        return (state.accessTokenExpiry = new Date(accessTokenExpiry))
    },
    setUser: (state, user) => (state.user = user),
}
