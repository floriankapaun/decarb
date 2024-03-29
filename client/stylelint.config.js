module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
    // add your custom config here
    // https://stylelint.io/user-guide/configuration
    rules: {
        indentation: [4],
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'extend',
                    'at-root',
                    'debug',
                    'warn',
                    'error',
                    'if',
                    'else',
                    'for',
                    'each',
                    'while',
                    'mixin',
                    'include',
                    'content',
                    'return',
                    'function',
                ],
            },
        ],
    },
}
