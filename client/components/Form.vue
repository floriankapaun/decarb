<template>
    <CvForm @submit.prevent="handleSubmit">
        <!-- Required and MinLenght aren't used as HTML attributes to prevent Browsers from Validating -->
        <CvTextInput
            v-for="input in inputs"
            :key="input.name"
            :ref="input.name"
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
        <CvButton :disaled="buttonDisabled">
            {{ buttonLabel }}
        </CvButton>
    </CvForm>
</template>

<script>
export default {
    props: {
        inputs: {
            type: Array,
            default: () => [],
            required: true,
        },
        buttonDisabled: {
            type: Boolean,
            default: false,
        },
        buttonLabel: {
            type: String,
            default: 'Submit',
        },
    },
    methods: {
        setValid(input) {
            input.invalidMessage = ''
        },
        setInvalid(input, message) {
            input.invalidMessage = message || `${input.label} invalid`
        },
        validateRequired(input) {
            if (input.required && !input.value) {
                return this.setInvalid(input, `${input.label} required`)
            }
            return this.setValid(input)
        },
        validateMinLength(input) {
            if (
                input.minLength &&
                (!input.value || input.value.length < input.minLength)
            ) {
                const invalidMessage = `Minimum ${input.minLength} characters required`
                return this.setInvalid(input, invalidMessage)
            }
            return this.setValid(input)
        },
        validateRegex(input) {
            if (
                input.regex &&
                (!input.value || !input.regex.test(input.value))
            ) {
                const invalidMessage = `Provide correct format for ${input.label}`
                return this.setInvalid(input, invalidMessage)
            }
            return this.setValid(input)
        },
        validateInput(input) {
            this.validateRequired(input)
            if (input.invalidMessage !== '') return (input.isValid = false)
            this.validateMinLength(input)
            if (input.invalidMessage !== '') return (input.isValid = false)
            this.validateRegex(input)
            if (input.invalidMessage !== '') return (input.isValid = false)
            return (input.isValid = true)
        },
        /**
         * Triggers validation for all inputs in `this.inputs`
         *
         * @returns {Boolean} - if all inputs are valid
         */
        validateInputs() {
            let allInputsValid = true
            // Validate each input in `this.inputs`
            for (const input of this.inputs) {
                this.validateInput(input)
                if (!input.isValid) allInputsValid = false
            }
            return allInputsValid
        },
        /**
         * Validates all Form Inputs and emits a submit event with the form data if
         * all Inputs were valid
         */
        handleSubmit() {
            const formIsValid = this.validateInputs()
            if (!formIsValid) return false
            // If Form is valid, create Object with input values and emit in event
            const inputValues = {}
            for (const input of this.inputs) {
                inputValues[input.name] = input.value
            }
            return this.$emit('submit', inputValues)
        },
    },
}
</script>
