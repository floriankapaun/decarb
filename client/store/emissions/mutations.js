export default {
    setIsLoading: (state, isLoading) => (state.isLoading = isLoading),
    setHostingEmissions: (state, hostingEmissions) => {
        return (state.hostingEmissions = hostingEmissions)
    },
    setAggregation: (state, aggregation) => (state.aggregation = aggregation),
}
