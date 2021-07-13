<template>
    <MinimalForm :title="$t('p.login.h1')">
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
            <i18n path="p.login.helperText" tag="p" class="helper-text">
                <template #link>
                    <CvLink :to="localeRoute('register')" size="sm">
                        {{ $t('p.login.helperTextLink') }}
                    </CvLink>
                </template>
            </i18n>
        </template>
    </MinimalForm>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { email, password } from '@/config/public/inputs'
import Form from '@/components/Form'

export default {
    name: 'Login',
    components: { Form },
    layout: 'minimal',
    nuxtI18n: {
        paths: {
            en: '/login',
        },
    },
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
        submitButtonLabel() {
            if (this.getIsLoading) {
                return this.$t('p.login.submitButtonLoading')
            }
            return this.$t('p.login.submitButton')
        },
    },
    methods: {
        ...mapActions({
            login: 'auth/login',
            fetchUser: 'auth/fetchUser',
        }),
        async handleSubmit(eventData) {
            const { email, password } = eventData
            if (!email || !password) return false
            await this.login({ email, password })
            await this.fetchUser(this.getAccessToken)
            if (!this.getIsLoggedIn) return
            if (!this.getUser.hasDomain) {
                return this.$router.push(
                    this.localeRoute('dashboard-register-domain')
                )
            }
            return this.$router.push(this.localeRoute('dashboard'))
        },
    },
}
</script>

<style lang="scss" scoped>
.login {
    &__wrapper {
        padding-top: $spacing-05;
        padding-bottom: $spacing-05;
        margin-bottom: $spacing-10;
    }
}
</style>
