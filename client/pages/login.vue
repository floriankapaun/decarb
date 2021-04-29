<template>
    <main>
        <h1>Login</h1>
        <h2>{{ getIsLoggedIn }}</h2>
        <form name="register" @submit.prevent="handleSubmit">
            <label for="email">E-Mail Address</label>
            <input
                id="email"
                v-model="email"
                type="email"
                autocomplete="email"
                placeholder="your@email.com"
                required
            />
            <label for="password">Password</label>
            <input
                id="password"
                v-model="password"
                type="password"
                autocomplete="new-password"
                minlength="8"
                placeholder="minimum 8 characters"
                required
            />
            <button type="submit" :disabled="getIsLoading">
                {{ getIsLoading ? 'Loading...' : 'Login' }}
            </button>
        </form>
        <p>
            Don't have an account yet?
            <NuxtLink to="register">Register now</NuxtLink>.
        </p>
        <section v-if="getIsLoggedIn">
            <h2>Congrats, you're logged in.</h2>
            <button type="button" @click="handleLogout">Logout</button>
        </section>

        <NuxtLink to="users/register-domain">Move on</NuxtLink>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    layout: 'minimal',
    data() {
        return {
            email: '',
            password: '',
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
        async handleSubmit() {
            await this.login({ email: this.email, password: this.password })
            await this.fetchUser(this.getAccessToken)
            // if (this.getUser) {
            //     return this.$router.push({
            //         path: `/users/${this.getUser.id}/verify-email`,
            //     })
            // }
            // OPTIMIZE: Maybe apply some error styling
        },
        async handleLogout() {
            await this.logout(this.getUser.email)
        },
    },
}
</script>
