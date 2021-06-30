export default {
    getIsLoading: (state) => state.isLoading,
    getDomains: (state) => state.domains,
    getUserDomains: (state) => state.userDomains,
    getSelectedDomain: (state) => {
        if (state.selectedDomain) return state.selectedDomain
        if (state.userDomains && state.userDomains.length) {
            return state.userDomains[0]
        }
        return undefined
    },
    getDomainPages: (state) => state.domainPages,
    getDomainPublicProfile: (state) => state.domainPublicProfile,
    getEmissionEstimation: (state) => state.emissionEstimation,
}
