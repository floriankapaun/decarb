export default {
    addDashboardNotification: (state, notification) => {
        return state.dashboardNotifications.push(notification)
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
    resetDashboardNotifications: (state) => (state.dashboardNotifications = []),
}
