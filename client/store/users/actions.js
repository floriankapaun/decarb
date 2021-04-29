import { saveFetch } from '@/utils/helpers'

export default {
    register: async ({ commit }, userData) => {
        commit('isLoading', true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        }
        const data = await saveFetch(
            'http://localhost:4000/api/v1/users',
            requestOptions
        )
        if (data) commit('user', data)
        commit('isLoading', false)
    },
    verify: async ({ commit }, { userId, verificationCode }) => {
        commit('isLoading', true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ verificationCode }),
        }
        const data = await saveFetch(
            `http://localhost:4000/api/v1/users/${userId}/verification`,
            requestOptions
        )
        if (data) commit('user', data)
        commit('isLoading', false)
    },
    setPassword: async ({ commit }, { userId, password }) => {
        commit('isLoading', true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        }
        const data = await saveFetch(
            `http://localhost:4000/api/v1/users/${userId}/password`,
            requestOptions
        )
        if (data) commit('user', data)
        commit('isLoading', false)
    },
}
