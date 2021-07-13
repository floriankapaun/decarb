// Make those actions globally available via imports
import authActions from './auth/actions'
import notificationActions from './notifications/actions'

export const state = () => ({
    config: {},
})

export const actions = {
    // run in every SSR
    // https://nuxtjs.org/docs/2.x/directory-structure/store#the-nuxtserverinit-action
    nuxtServerInit(store, context) {
        // read runtime environment everytime and set to store
        store.commit('setConfig', context.$config)
    },
    ...authActions,
    ...notificationActions,
}

export const mutations = {
    setConfig: (state, config) => (state.config = config),
}

export const getters = {
    getConfig: (state) => state.config,
}
