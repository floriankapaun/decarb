export default {
    setIsLoading: (state, isLoading) => (state.isLoading = isLoading),
    setAggregation: (state, aggregation) => (state.aggregation = aggregation),
    setHostingEmissions: (state, hostingEmissions) => {
        return (state.hostingEmissions = hostingEmissions)
    },
    setPageviewEmissions: (state, pageviewEmissions) => {
        return (state.pageviewEmissions = pageviewEmissions)
    },
}
