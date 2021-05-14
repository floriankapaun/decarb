<template>
    <div>
        <section class="bx--row">
            <div
                class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-5 bx--col-xlg-6 mb-07 verification__wrapper"
            >
                <h1>Check your E-Mail For Confirmation</h1>
                <p class="mb-06">
                    To verify your email we have sent a code to
                    {{
                        getUser && getUser.email ? getUser.email : 'your email'
                    }}.
                </p>
                <Form
                    class="mb-06"
                    :button-label="
                        getIsLoading
                            ? 'Loading...'
                            : 'Create your Eco Web Account'
                    "
                    :button-disbaled="getIsLoading"
                    :inputs="inputs"
                    @submit="handleSubmit"
                />
                <p>
                    With your registration you agree to our
                    <CvLink to="/legal/terms-and-conditions" size="lg"
                        >terms and conditions</CvLink
                    >. Please read our privacy policy and our notes on cookies.
                </p>
            </div>
        </section>
        <section class="bx--row">
            <div
                class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-6 bx--col-xlg-4"
            >
                <p class="helper-text">
                    Can’t find the email? Check your spam folder, or
                    <CvLink to="/register" size="sm">
                        re-enter your email and try again </CvLink
                    >.
                </p>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { verificationCode } from '@/config/public/inputs'

export default {
    layout: 'minimal',
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
                return this.$router.push({
                    path: `/users/${this.getUser.id}/set-password`,
                })
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
