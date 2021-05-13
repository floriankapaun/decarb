export default {
    addNotification: (state, notification) => {
        return state.notifications.push(notification)
    },
    removeNotification: (state, notification) => {
        // Find notification by `createdAt`, which is unique
        const filteredNotifications = state.notifications.filter((x) => {
            return x.createdAt !== notification.createdAt
        })
        return (state.notifications = filteredNotifications)
    },
    resetNotifications: (state) => (state.notifications = []),
}
