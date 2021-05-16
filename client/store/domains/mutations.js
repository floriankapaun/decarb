export default {
    setIsLoading: (state, isLoading) => (state.isLoading = isLoading),
    setDomains: (state, domains) => (state.domains = domains),
    setUserDomains: (state, userDomains) => (state.userDomains = userDomains),
    setSelectedDomain: (state, selectedDomain) => {
        return (state.selectedDomain = selectedDomain)
    },
    setSelectedDomainIfUndefined: (state, userDomains) => {
        if (!state.selectedDomain) {
            return (state.selectedDomain = userDomains[0])
        }
        return state.selectedDomain
    },
    setDomainPages: (state, domainPages) => (state.domainPages = domainPages),
}
