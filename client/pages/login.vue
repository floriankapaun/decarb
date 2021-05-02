<template>
    <section>
        <h1>Login</h1>
        <Form
            :button-label="getIsLoading ? 'Loading...' : 'Login'"
            :button-disbaled="getIsLoading"
            :inputs="inputs"
            @submit="handleSubmit"
        />
        <p>
            Don't have an account yet?
            <NuxtLink to="register">Register now</NuxtLink>.
        </p>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { email, password } from '@/config/inputs'
import Form from '@/components/Form'

export default {
    components: { Form },
    layout: 'minimal',
    middleware: ['guest'],
    data() {
        return {
            email: '',
            password: '',
            inputs: [email, password],
        }
    },
    computed: {
        ...mapGetters({
            getIsLoading: 'auth/getIsLoading',
            getIsLoggedIn: 'auth/getIsLoggedIn',
            getAccessToken: 'auth/getAccessToken',
            getUser: 'auth/getUser',
        }),
    },
    methods: {
        ...mapActions({
            login: 'auth/login',
            fetchUser: 'auth/fetchUser',
            logout: 'auth/logout',
        }),
        handleSubmit(obj) {
            console.log(obj)
            // await this.login({ email: this.email, password: this.password })
            // await this.fetchUser(this.getAccessToken)
            // if (this.getIsLoggedIn) return this.$router.push('/')
            // OPTIMIZE: Maybe apply some error styling
        },
        // async handleLogout() {
        //     await this.logout(this.getUser.email)
        // },
    },
}
</script>
