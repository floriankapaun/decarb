<template>
    <section class="bx--row">
        <div
            class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-5 bx--col-xlg-6 mb-07 verification__wrapper"
        >
            <h1>Set up a password</h1>
            <p class="mb-06">
                To verify your email we have sent a code to
                {{ getUser && getUser.email ? getUser.email : 'your email' }}.
            </p>
            <Form
                :button-label="getIsLoading ? 'Loading...' : 'Set Password'"
                :button-disbaled="getIsLoading"
                :inputs="inputs"
                @submit="handleSubmit"
            />
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { newPassword, confirmNewPassword } from '@/config/public/inputs'

export default {
    layout: 'minimal',
    asyncData({ params }) {
        return {
            id: params.id,
            inputs: [newPassword, confirmNewPassword],
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
        // OPTIMIZE: Make sure this link isn't used twice. Probably on the API side.
        async handleSubmit(eventData) {
            const { newPassword } = eventData
            if (!newPassword) return false
            await this.setPassword({ userId: this.id, password: newPassword })
            // OPTIMIZE: Maybe apply some error styling
            if (!this.getUser) return false
            // Login
            await this.login({
                email: this.getUser.email,
                password: newPassword,
            })
            await this.fetchUser(this.getAccessToken)
            // Change to next route. If this is not working, the user will be
            // redirected to '/login' because of this pages middleware.
            return this.$router.push({ path: '/dashboard/register-domain' })
        },
    },
}
</script>
