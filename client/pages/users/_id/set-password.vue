<template>
    <section class="bx--row">
        <div
            class="
                bx--col-sm-4
                bx--offset-md-2
                bx--col-md-4
                bx--col-lg-8
                bx--offset-xlg-5
                bx--col-xlg-6
                mb-07
                verification__wrapper
            "
        >
            <h1>{{ $t('p.users.id.setPassword.h1') }}</h1>
            <i18n
                path="p.users.id.setPassword.explanation"
                tag="p"
                class="mb-06"
            >
                <template #email>{{
                    getUser && getUser.email
                        ? getUser.email
                        : $t('p.users.id.setPassword.emailDefault')
                }}</template>
            </i18n>
            <Form
                :button-label="submitButtonLabel"
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
    name: 'UsersSetPassword',
    layout: 'minimal',
    nuxtI18n: {
        paths: {
            en: '/users/:id/set-password',
        },
    },
    async middleware(context) {
        // OPTIMIZE: Add localeRoute to redirects
        const { store, redirect, route } = context
        if (!route?.params?.id) return redirect('/')
        // Get Users Registration State
        await store.dispatch('users/fetchRegistrationState', route?.params?.id)
        const state = store.getters['users/getRegistrationState']
        if (!state?.exists) return redirect('/')
        if (!state.isVerified) {
            return redirect(`/users/${route.params.id}/verify-email`)
        }
        if (state.hasPassword) {
            return redirect('/dashboard/register-domain')
        }
    },
    data() {
        return {
            id: this.$route.params.id,
            inputs: [newPassword, confirmNewPassword],
        }
    },
    computed: {
        ...mapGetters({
            getIsLoading: 'users/isLoading',
            getUser: 'users/user',
            getAccessToken: 'auth/getAccessToken',
        }),
        submitButtonLabel() {
            if (this.getIsLoading) {
                return this.$t('p.users.id.setPassword.submitButtonLoading')
            }
            return this.$t('p.users.id.setPassword.submitButton')
        },
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
            return this.$router.push(
                this.localeRoute('dashboard-register-domain')
            )
        },
    },
}
</script>
