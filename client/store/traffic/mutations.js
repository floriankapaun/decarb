export default {
    setIsLoading: (state, isLoading) => (state.isLoading = isLoading),
    setViewsPerDay: (state, viewsPerDay) => {
        return (state.viewsPerDay = viewsPerDay)
    },
    setViewsPerPage: (state, viewsPerPage) => {
        return (state.viewsPerPage = viewsPerPage)
    },
}
