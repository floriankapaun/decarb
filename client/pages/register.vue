<template>
    <div>
        <section class="bx--row">
            <div
                class="
                    bx--col-sm-4
                    bx--offset-md-2
                    bx--col-md-4
                    bx--col-lg-8
                    bx--offset-xlg-6
                    bx--col-xlg-4
                    mb-07
                    register__wrapper
                "
            >
                <h1>{{ $t('p.register.h1') }}</h1>
                <Form
                    :button-label="submitButtonLabel"
                    :button-disbaled="getIsLoading"
                    :inputs="inputs"
                    @submit="handleSubmit"
                />
            </div>
        </section>
        <section class="bx--row">
            <div
                class="
                    bx--col-sm-4
                    bx--offset-md-2
                    bx--col-md-4
                    bx--col-lg-8
                    bx--offset-xlg-6
                    bx--col-xlg-4
                "
            >
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
            </div>
        </section>
    </div>
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
            // OPTIMIZE: Maybe apply some error styling
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
        @include carbon--type-style('helper-text-01');
    }
}
</style>
