<template>
    <CvForm @submit.prevent="handleSubmit">
        <fieldset v-for="input in inputs" :key="input.name">
            <!-- Required and MinLenght aren't used as HTML attributes to prevent Browsers from Validating -->
            <CvNumberInput
                v-if="input.type === 'number'"
                :ref="input.name"
                v-model="input.value"
                :type="input.type"
                :inputmode="input.inputmode"
                :autocomplete="input.autocomplete"
                :label="input.label"
                :placeholder="input.placeholder"
                :invalid="input.invalid"
                :invalid-message="input.invalidMessage"
                :helper-text="input.helperText"
                :min="input.min"
                :max="input.max"
                :step="input.step"
                :mobile="input.mobile"
            ></CvNumberInput>
            <CvTextInput
                v-else
                :ref="input.name"
                v-model="input.value"
                :type="input.type"
                :inputmode="input.inputmode"
                :autocomplete="input.autocomplete"
                :label="input.label"
                :placeholder="input.placeholder"
                :helper-text="input.helperText"
                :invalid="input.invalid"
                :invalid-message="input.invalidMessage"
                :password-visible="input.passwordVisible"
                :password-hide-label="input.passwordHideLabel"
                :password-show-label="input.passwordShowLabel"
            ></CvTextInput>
        </fieldset>
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
        validateExactLength(input) {
            if (
                input.exactLength &&
                (!input.value || input.value.length !== input.exactLength)
            ) {
                const invalidMessage = `Exactly ${input.exactLength} characters required`
                return this.setInvalid(input, invalidMessage)
            }
            return this.setValid(input)
        },
        validateExactMatch(input) {
            if (
                input.exactMatch &&
                (!input.value ||
                    !this.$refs[input.exactMatch] ||
                    !this.$refs[input.exactMatch][0].value ||
                    input.value !== this.$refs[input.exactMatch][0].value)
            ) {
                const invalidMessage = `${input.label} must match ${
                    this.$refs[input.exactMatch][0].label
                }`
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
            this.validateExactLength(input)
            if (input.invalidMessage !== '') return (input.isValid = false)
            this.validateExactMatch(input)
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

<style lang="scss" scoped>
.bx--form-item {
    margin-bottom: $spacing-07;
}

// TODO: Add PR to Carbon Desing Repository
// https://github.com/carbon-design-system/carbon-components-vue/blob/main/packages/core/src/components/cv-text-input/cv-text-input.vue
// Input: bx--password-input
// Button: bx--btn bx--btn--icon-only
</style>
