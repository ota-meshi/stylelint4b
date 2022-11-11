"use strict"

module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
        parser: 'babel-eslint'
    },
    extends: [
        "plugin:@mysticatea/es2019",
        "plugin:@mysticatea/+browser",
    ],
    globals: {
        global: false,
        process: false,
        __dirname: false,
        __filename: false,
        exports: false,
        module: false,
        require: false,
    },
    plugins: [],
    rules: {
        'require-jsdoc': 'error',
        "no-warning-comments": "warn",
        "@mysticatea/no-use-ignored-vars": ["error", "^_[a-zA-Z]+$"],
        "@mysticatea/node/no-extraneous-require": "warn",
        "no-implicit-globals": "off",
        "@mysticatea/vue/comma-dangle": "off",
        "@mysticatea/vue/html-closing-bracket-newline": "off",
        "@mysticatea/vue/html-indent": "off",
        "@mysticatea/vue/html-self-closing": "off",
        "@mysticatea/vue/singleline-html-element-content-newline": "off"
    },
    overrides: [
        {
            files: ['*.mjs'],
            parserOptions: {
                sourceType: 'module',
            },
        }
    ]
}