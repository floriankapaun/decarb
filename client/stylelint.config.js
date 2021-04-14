module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
    // add your custom config here
    // https://stylelint.io/user-guide/configuration
    rules: {
        indentation: [
            4,
            {
                except: ['block'],
                message: 'Please use 4 spaces for indentation.',
                severity: 'warning',
            },
        ],
    },
}
