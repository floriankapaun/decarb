export default {
    setIsLoading: (state, isLoading) => (state.isLoading = isLoading),
    setCheckoutSessionId: (state, checkoutSessionId) => {
        return (state.checkoutSessionId = checkoutSessionId)
    },
    setSubscription: (state, subscription) => {
        return (state.subscription = subscription)
    },
}
