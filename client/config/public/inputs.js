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
