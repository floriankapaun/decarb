<template>
    <section>
        <h1>Login</h1>
        <CvForm @submit.prevent="handleSubmit">
            <!-- Required and MinLenght aren't used as HTML attributes to prevent Browsers from Validating -->
            <CvTextInput
                v-for="(input, inputName) in inputs"
                :key="inputName"
                :ref="inputName"
                v-model="input.value"
                :type="input.type"
                :inputmode="input.inputmode"
                :autocomplete="input.autocomplete"
                :label="input.label"
                :placeholder="input.placeholder"
                :invalid="input.invalid"
                :invalid-message="input.invalidMessage"
                :password-visible="input.passwordVisible"
                :password-hide-label="input.passwordHideLabel"
                :password-show-label="input.passwordShowLabel"
            ></CvTextInput>
            <CvButton :disabled="getIsLoading">
                {{ getIsLoading ? 'Loading...' : 'Login' }}
            </CvButton>
        </CvForm>
        <p>
            Don't have an account yet?
            <NuxtLink to="register">Register now</NuxtLink>.
        </p>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    layout: 'minimal',
    middleware: ['guest'],
    data() {
        return {
            inputs: {
                email: {
                    value: '',
                    type: 'text',
                    inputmode: 'email',
                    autocomplete: 'email',
                    label: 'E-Mail Address',
                    placeholder: 'your@email.com',
                    invalid: undefined,
                    invalidMessage: '',
                    required: true,
                    regex: /\S+@\S+\.\S+/,
                },
                password: {
                    value: '',
                    type: 'password',
                    autocomplete: 'password',
                    label: 'Password',
                    placeholder: 'Minimum 8 Characters',
                    invalid: undefined,
                    invalidMessage: '',
                    passwordVisible: false,
                    passwordHideLabel: 'Hide password',
                    passwordShowLabel: 'Show password',
                    minLength: 8,
                    required: true,
                },
            },
        }
    },
    computed: {
        ...mapGetters({
            getIsLoading: 'auth/getIsLoading',
            getIsLoggedIn: 'auth/getIsLoggedIn',
            getAccessToken: 'auth/getAccessToken',
            getUser: 'auth/getUser',
        }),
    },
    methods: {
        ...mapActions({
            login: 'auth/login',
            fetchUser: 'auth/fetchUser',
            logout: 'auth/logout',
        }),
        validateRequired(input) {
            if (!input.required) {
                input.invalidMessage = ''
                return true
            }
            if (!input.value) {
                input.invalidMessage = `${input.label} required`
                return false
            }
            input.invalidMessage = ''
            return true
        },
        validateMinLength(input) {
            if (!input.minLength) {
                input.invalidMessage = ''
                return true
            }
            if (!input.value || input.value.length < input.minLength) {
                input.invalidMessage = `Minimum ${input.minLength} characters required`
                return false
            }
            input.invalidMessage = ''
            return true
        },
        validateRegex(input) {
            if (!input.regex) {
                input.invalidMessage = ''
                return true
            }
            if (!input.value || !input.regex.test(input.value)) {
                input.invalidMessage = `Provide correct format for ${input.label}`
                return false
            }
            input.invalidMessage = ''
            return true
        },
        validateInput(input) {
            if (!this.validateRequired(input)) return (input.isValid = false)
            if (!this.validateMinLength(input)) return (input.isValid = false)
            if (!this.validateRegex(input)) return (input.isValid = false)
            return (input.isValid = true)
        },
        validateInputs() {
            let allInputsValid = true
            Object.keys(this.inputs).forEach((key) => {
                const input = this.inputs[key]
                this.validateInput(input)
                if (!input.isValid) allInputsValid = false
            })
            return allInputsValid
        },
        handleSubmit() {
            const formIsValid = this.validateInputs()
            if (!formIsValid) {
                console.log('Form not valid')
                return false
            }
            // await this.login({ email: this.email, password: this.password })
            // await this.fetchUser(this.getAccessToken)
            // if (this.getIsLoggedIn) return this.$router.push('/')
            // OPTIMIZE: Maybe apply some error styling
        },
        // async handleLogout() {
        //     await this.logout(this.getUser.email)
        // },
    },
}
</script>
