export default {
    /**
     * Add a Notification to `state.minimalNotifications`
     *
     * @param {Object} context - Vuex Store Context
     * @param {Notification} notification
     */
    addNotification: (context, notification) => {
        context.commit('addNotification', notification)
    },

    /**
     * Remove a Notification from `state.notifications`
     *
     * @param {Object} context - Vuex Store Context
     * @param {Notification} notification
     */
    removeNotification: ({ commit }, notification) => {
        commit('removeNotification', notification)
    },
}
