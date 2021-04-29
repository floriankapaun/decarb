<template>
    <main>
        <h1>Check your E-Mail For Confirmation</h1>
        <p>
            To verify your email we have sent a code to
            {{ getUser && getUser.email ? getUser.email : 'your email' }}.
        </p>
        <form name="verify-email" @submit.prevent="handleSubmit">
            <label for="verificationCode">Input Code</label>
            <input
                id="verificationCode"
                v-model="verificationCode"
                type="text"
                placeholder="e.g. N1K39L"
                required
            />
            <button type="submit" :disabled="getIsLoading">
                {{
                    getIsLoading ? 'Loading...' : 'Create your Eco-Web Account'
                }}
            </button>
        </form>
        <p>
            With your registration you agree to our terms and conditions. Please
            read our privacy policy, our notes on cookies and our notes on
            interest-based advertising.
        </p>
        <p>
            Can’t find the email? Check your spam folder, or
            <NuxtLink to="register">re-enter your email and try again</NuxtLink
            >.
        </p>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    layout: 'minimal',
    asyncData({ params }) {
        return {
            id: params.id,
        }
    },
    data() {
        return {
            verificationCode: '',
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
        async handleSubmit() {
            await this.verify({
                userId: this.id,
                verificationCode: this.verificationCode,
            })
            if (this.getUser) {
                console.log(this.getUser)
                return this.$router.push({
                    path: `/users/${this.getUser.id}/set-password`,
                })
            }
            // OPTIMIZE: Maybe apply some error styling
        },
    },
}
</script>
