export default {
    set: (state, type, message) => (state[type] = message),
    reset: (state, type) => (state[type] = ''),
}
