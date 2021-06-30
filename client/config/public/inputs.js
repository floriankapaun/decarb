// TODO: Internationalize Labels

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
    placeholder: 'e.g. 930522',
    invalid: undefined,
    invalidMessage: '',
    exactLength: 6,
    required: true,
}

export const newPassword = {
    name: 'newPassword',
    value: '',
    type: 'password',
    autocomplete: 'new-password',
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

export const confirmNewPassword = {
    name: 'confirmNewPassword',
    value: '',
    type: 'password',
    autocomplete: 'new-password',
    label: 'Repeat Password',
    placeholder: 'Minimum 8 Characters',
    invalid: undefined,
    invalidMessage: '',
    passwordVisible: false,
    passwordHideLabel: 'Hide password',
    passwordShowLabel: 'Show password',
    minLength: 8,
    exactMatch: 'newPassword',
    required: true,
}

export const siteUrl = {
    name: 'siteUrl',
    value: '',
    type: 'text',
    inputmode: 'numeric',
    autocomplete: 'off',
    label: 'Website URL',
    placeholder: 'e.g. your-domain.com',
    invalid: undefined,
    invalidMessage: '',
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
    helperText: 'Used for initial cost estimation',
    placeholder: '13.000',
    invalid: undefined,
    invalidMessage: '',
    required: true,
    min: 1,
    step: 1,
    mobile: true,
}
