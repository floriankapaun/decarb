export default {
    isLoading(state, boolean) {
        state.isLoading = boolean
    },
    user(state, userData) {
        state.user = userData
    },
    setRegistrationState: (state, registrationState) => {
        return (state.registrationState = registrationState)
    },
    // add(state, text) {
    //     state.list.push({
    //         text,
    //         done: false,
    //     })
    // },
    // remove(state, { todo }) {
    //     state.list.splice(state.list.indexOf(todo), 1)
    // },
    // toggle(state, todo) {
    //     todo.done = !todo.done
    // },
}
