export default {
    addMinimalNotification: (state, notification) => {
        return state.minimalNotifications.push(notification)
    },
    addDashboardNotification: (state, notification) => {
        return state.dashboardNotifications.push(notification)
    },
    removeMinimalNotification: (state, notification) => {
        // Find notification by `createdAt`
        const filteredMinimalNotifications = state.minimalNotifications.filter(
            (x) => {
                return x.createdAt !== notification.createdAt
            }
        )
        return (state.minimalNotifications = filteredMinimalNotifications)
    },
    removeDashboardNotification: (state, notification) => {
        // Find notification by `createdAt`
        const filteredDashboardNotifications = state.dashboardNotifications.filter(
            (x) => {
                return x.createdAt !== notification.createdAt
            }
        )
        return (state.dashboardNotifications = filteredDashboardNotifications)
    },
    resetMinimalNotifications: (state) => (state.minimalNotifications = []),
    resetDashboardNotifications: (state) => (state.dashboardNotifications = []),
}
