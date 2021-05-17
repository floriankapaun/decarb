<template>
    <div>
        <section class="bx--row">
            <div
                class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-5 bx--col-xlg-6 mb-07 verification__wrapper"
            >
                <h1>{{ $t('p.users.id.verifyEmail.h1') }}</h1>
                <i18n
                    path="p.users.id.verifyEmail.explanation"
                    tag="p"
                    class="mb-06"
                >
                    <template #email>{{
                        getUser && getUser.email
                            ? getUser.email
                            : $t('p.users.id.verifyEmail.emailDefault')
                    }}</template>
                </i18n>
                <Form
                    class="mb-06"
                    :button-label="submitButtonLabel"
                    :button-disbaled="getIsLoading"
                    :inputs="inputs"
                    @submit="handleSubmit"
                />
                <i18n path="p.users.id.verifyEmail.tos" tag="p">
                    <template #link>
                        <CvLink
                            :to="localeRoute('legal-terms-and-conditions')"
                            size="lg"
                            >{{ $t('p.users.id.verifyEmail.tosLink') }}</CvLink
                        >
                    </template>
                </i18n>
            </div>
        </section>
        <section class="bx--row">
            <div
                class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-6 bx--col-xlg-4"
            >
                <i18n
                    path="p.users.id.verifyEmail.helperText"
                    tag="p"
                    class="helper-text"
                >
                    <template #link>
                        <CvLink :to="localeRoute('register')" size="sm">
                            {{ $t('p.users.id.verifyEmail.helperTextLink') }}
                        </CvLink>
                    </template>
                </i18n>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { verificationCode } from '@/config/public/inputs'

export default {
    layout: 'minimal',
    nuxtI18n: {
        paths: {
            en: '/users/:id/verify-email',
        },
    },
    asyncData({ params }) {
        // TODO: Check if User with params.id exists and isn't validated yet
        return {
            id: params.id,
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
            if (this.getUser) {
                return this.$router.push(
                    this.localeRoute(`/users/${this.getUser.id}/set-password`)
                )
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.verification__wrapper {
    padding-top: $spacing-05;
    padding-bottom: $spacing-05;
    margin-bottom: $spacing-10;
}
</style>
