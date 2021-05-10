import { saveFetch } from '@/utils/helpers'

export default {
    register: async (context, userData) => {
        const { commit } = context
        commit('isLoading', true)
        const data = await saveFetch(context, 'POST', '/users', userData)
        if (data && data.data) commit('user', data.data)
        commit('isLoading', false)
    },
    verify: async (context, { userId, verificationCode }) => {
        const { commit } = context
        commit('isLoading', true)
        const data = await saveFetch(
            context,
            'POST',
            `/users/${userId}/verification`,
            { verificationCode }
        )
        if (data && data.data) commit('user', data.data)
        commit('isLoading', false)
    },
    setPassword: async (context, { userId, password }) => {
        const { commit } = context
        commit('isLoading', true)
        const data = await saveFetch(
            context,
            'POST',
            `/users/${userId}/password`,
            { password }
        )
        if (data && data.data) commit('user', data.data)
        commit('isLoading', false)
    },
}
