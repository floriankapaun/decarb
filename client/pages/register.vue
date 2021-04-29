<template>
    <main>
        <h1>Create your eco-Web Account</h1>
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
            <button type="submit" :disabled="getIsLoading">
                {{ getIsLoading ? 'Loading...' : 'Create Account' }}
            </button>
        </form>
        <p>
            Already have an account?
            <NuxtLink to="login">Sign in now</NuxtLink>.
        </p>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    layout: 'minimal',
    data() {
        return {
            email: '',
        }
    },
    computed: {
        ...mapGetters({
            getIsLoading: 'users/isLoading',
            getUser: 'users/user',
        }),
    },
    methods: {
        ...mapActions({
            register: 'users/register',
        }),
        async handleSubmit() {
            await this.register({ email: this.email })
            if (this.getUser) {
                return this.$router.push({
                    path: `/users/${this.getUser.id}/verify-email`,
                })
            }
            // OPTIMIZE: Maybe apply some error styling
        },
    },
}
</script>
