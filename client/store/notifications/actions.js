export default {
    /**
     * Add a Notification to `state.dashboardNotifications`
     * @param {Object} context - Vuex Store Context
     * @param {Notification} notification
     */
    addDashboardNotification: ({ commit }, notification) => {
        commit('addDashboardNotification', notification)
    },

    /**
     * Remove a Notification from `state.dashboardNotifications`
     * @param {Object} context - Vuex Store Context
     * @param {Notification} notification
     */
    removeDashboardNotification: ({ commit }, notification) => {
        commit('removeDashboardNotification', notification)
    },
}
