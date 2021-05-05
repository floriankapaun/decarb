<template>
    <div>
        <section class="bx--row login">
            <div
                class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-6 bx--col-xlg-4 login__wrapper"
            >
                <h1 class="login__heading">Login</h1>
                <Form
                    class="login__form"
                    :button-label="getIsLoading ? 'Loading...' : 'Login'"
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
                <p class="login__register-paragraph">
                    Don't have an account yet?
                    <NuxtLink to="register">Register now</NuxtLink>.
                </p>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { email, password } from '@/config/public/inputs'
import Form from '@/components/Form'

export default {
    components: { Form },
    layout: 'minimal',
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
        }),
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
            if (this.getIsLoggedIn) return this.$router.push('dashboard')
            // OPTIMIZE: Maybe apply some error styling
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/carbon-utils';

.login {
    &__wrapper {
        // background-color: $decorative-01;
        padding-top: $spacing-05;
        padding-bottom: $spacing-05;
        margin-bottom: $spacing-10;
    }

    &__heading {
        margin-bottom: $spacing-06;
        @include carbon--type-style('expressive-heading-06');
    }

    &__register-paragraph {
        @include carbon--type-style('helper-text-01');
    }
}
</style>
