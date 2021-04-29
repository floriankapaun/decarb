export default {
    set: ({ commit }, alert) => commit(alert.type, alert.message),
}
