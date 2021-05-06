export default {
    setIsLoading: (state, isLoading) => (state.isLoading = isLoading),
    setDomains: (state, domains) => (state.domains = domains),
    setUserDomains: (state, userDomains) => (state.userDomains = userDomains),
    setSelectedDomain: (state, selectedDomain) => {
        return (state.selectedDomain = selectedDomain)
    },
}
