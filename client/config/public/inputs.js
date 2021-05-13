export const email = {
    name: 'email',
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
}

export const verificationCode = {
    name: 'verificationCode',
    value: '',
    type: 'text',
    inputmode: 'numeric',
    autocomplete: 'off',
    label: 'Verification Code',
    placeholder: 'e.g. N1K39L',
    invalid: undefined,
    invalidMessage: '',
    exactLength: 6,
    required: true,
}

export const password = {
    name: 'password',
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
}

export const estimatedMonthlyPageViews = {
    name: 'estimatedMonthlyPageViews',
    value: '',
    type: 'number',
    inputmode: 'numeric',
    autocomplete: 'off',
    label: 'Average monthly pageviews',
    placeholder: '13.000',
    invalid: undefined,
    invalidMessage: '',
    required: true,
    min: 1,
    step: 1,
    mobile: true,
}
