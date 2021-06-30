<template>
    <MinimalForm :title="$t('p.users.id.verifyEmail.h1')">
        <template #text>
            {{ $t('p.users.id.verifyEmail.explanation') }}
        </template>

        <template #form>
            <Form
                class="mb-md"
                :button-label="submitButtonLabel"
                :button-disbaled="getIsLoading"
                :inputs="inputs"
                :light="true"
                @submit="handleSubmit"
            />
        </template>

        <template #helper>
            <i18n
                path="p.users.id.verifyEmail.tos"
                tag="p"
                class="note helper-text mb-md"
            >
                <template #link>
                    <CvLink
                        :to="localeRoute('legal-terms-and-conditions')"
                        size="sm"
                        >{{ $t('p.users.id.verifyEmail.tosLink') }}</CvLink
                    >
                </template>
            </i18n>

            <i18n
                path="p.users.id.verifyEmail.helperText"
                tag="p"
                class="helper-text helper"
            >
                <template #link>
                    <CvLink :to="localeRoute('register')" size="sm">
                        {{ $t('p.users.id.verifyEmail.helperTextLink') }}
                    </CvLink>
                </template>
            </i18n>
        </template>
    </MinimalForm>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { verificationCode } from '@/config/public/inputs'

export default {
    name: 'UsersVerifyEmail',
    layout: 'minimal',
    nuxtI18n: {
        paths: {
            en: '/users/:id/verify-email',
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
        if (state.isVerified && state.hasPassword) {
            return redirect('/dashboard/register-domain')
        }
        if (state.isVerified) {
            return redirect(`/users/${route.params.id}/set-password`)
        }
    },
    data() {
        return {
            id: this.$route.params.id,
            inputs: [verificationCode],
        }
    },
    computed: {
        ...mapGetters({
            getIsLoading: 'users/isLoading',
            getUser: 'users/user',
        }),
        submitButtonLabel() {
            if (this.getIsLoading) {
                return this.$t('p.users.id.verifyEmail.submitButtonLoading')
            }
            return this.$t('p.users.id.verifyEmail.submitButton')
        },
    },
    methods: {
        ...mapActions({
            verify: 'users/verify',
        }),
        async handleSubmit(eventData) {
            const { verificationCode } = eventData
            if (!verificationCode) return false
            await this.verify({
                userId: this.id,
                verificationCode,
            })
            if (this.getUser?.verifiedAt) {
                return this.$router.push(
                    this.localeRoute(`/users/${this.getUser.id}/set-password`)
                )
            }
        },
    },
}
</script>
