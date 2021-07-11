<template>
    <MinimalForm :title="$t('p.register.h1')">
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
                path="p.register.helperText"
                tag="p"
                class="register__login-paragraph"
            >
                <template #link>
                    <CvLink :to="localeRoute('login')" size="sm">
                        {{ $t('p.register.helperTextLink') }}
                    </CvLink>
                </template>
            </i18n>
        </template>
    </MinimalForm>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { email } from '@/config/public/inputs'

export default {
    name: 'Register',
    layout: 'minimal',
    nuxtI18n: {
        paths: {
            en: '/register',
        },
    },
    middleware: ['guest'],
    data() {
        return {
            inputs: [email],
        }
    },
    computed: {
        ...mapGetters({
            getIsLoading: 'users/isLoading',
            getUser: 'users/user',
        }),
        submitButtonLabel() {
            if (this.getIsLoading) {
                return this.$t('p.register.submitButtonLoading')
            }
            return this.$t('p.register.submitButton')
        },
    },
    methods: {
        ...mapActions({
            fetchUser: 'auth/fetchUser',
            register: 'users/register',
        }),
        async handleSubmit(eventData) {
            const { email } = eventData
            if (!email) return false
            await this.register({ email })
            if (this.getUser) {
                return this.$router.push(
                    this.localeRoute(`/users/${this.getUser.id}/verify-email`)
                )
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.register {
    &__wrapper {
        padding-top: $spacing-05;
        padding-bottom: $spacing-05;
        margin-bottom: $spacing-10;
    }

    &__login-paragraph {
        @include decarb--type-style('helper-text-01');
    }
}
</style>
