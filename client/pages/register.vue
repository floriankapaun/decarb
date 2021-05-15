<template>
    <div>
        <section class="bx--row">
            <div
                class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-5 bx--col-xlg-6 mb-07 register__wrapper"
            >
                <h1>Create your Eco Web Account</h1>
                <Form
                    :button-label="
                        getIsLoading ? 'Loading...' : 'Create Account'
                    "
                    :button-disbaled="getIsLoading"
                    :inputs="inputs"
                    @submit="handleSubmit"
                />
            </div>
        </section>
        <section class="bx--row">
            <div
                class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-6 bx--col-xlg-4"
            >
                <p class="register__login-paragraph">
                    Already have an account?
                    <CvLink :to="localeRoute('/login')" size="sm"
                        >Sign in now</CvLink
                    >.
                </p>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { email } from '@/config/public/inputs'

export default {
    layout: 'minimal',
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
                return this.$router.push({
                    path: `/users/${this.getUser.id}/verify-email`,
                })
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
