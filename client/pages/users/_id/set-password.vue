<template>
    <main>
        <h1>Set up a password</h1>
        <p>
            To verify your email we have sent a code to
            {{ getUser && getUser.email ? getUser.email : 'your email' }}.
        </p>
        <form name="set-password" @submit.prevent="handleSubmit">
            <label for="password">Password</label>
            <input
                id="password"
                v-model="password"
                type="password"
                autocomplete="new-password"
                minlength="8"
                placeholder="minimum 8 characters"
                required
                @change="validatePassword"
            />
            <label for="confirmPassword">Repeat Password</label>
            <input
                id="confirmPassword"
                ref="confirmPassword"
                v-model="confirmPassword"
                type="password"
                autocomplete="new-password"
                minlength="8"
                placeholder="minimum 8 characters"
                required
                @keyup="validatePassword"
            />
            <button type="submit" :disabled="getIsLoading">
                {{ getIsLoading ? 'Loading...' : 'Set Password' }}
            </button>
        </form>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    layout: 'minimal',
    asyncData({ params }) {
        return {
            id: params.id,
        }
    },
    data() {
        return {
            password: '',
            confirmPassword: '',
        }
    },
    computed: {
        ...mapGetters({
            getIsLoading: 'users/isLoading',
            getUser: 'users/user',
            getAccessToken: 'auth/getAccessToken',
        }),
    },
    methods: {
        ...mapActions({
            setPassword: 'users/setPassword',
            login: 'auth/login',
            fetchUser: 'auth/fetchUser',
        }),
        validatePassword() {
            const elem = this.$refs.confirmPassword
            if (this.password === this.confirmPassword) {
                elem.setCustomValidity('')
            } else {
                elem.setCustomValidity(`Passwords don't Match`)
            }
        },
        // OPTIMIZE: Make sure this link isn't used twice. Probably on the API side.
        async handleSubmit() {
            await this.setPassword({ userId: this.id, password: this.password })
            // OPTIMIZE: Maybe apply some error styling
            if (!this.getUser) return false
            // Login
            await this.login({
                email: this.getUser.email,
                password: this.password,
            })
            await this.fetchUser(this.getAccessToken)
            // Change to next route. If this is not working, the user will be
            // redirected to '/login' because of this pages middleware.
            return this.$router.push({ path: '/dashboard/register-domain' })
        },
    },
}
</script>
