"use strict";

module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "script",
  },
  extends: [
    "plugin:@ota-meshi/+json",
    "plugin:@ota-meshi/+yaml",
    "plugin:@ota-meshi/+prettier",
  ],
  globals: {
    global: false,
    process: false,
    __dirname: false,
    __filename: false,
    exports: false,
    module: false,
    require: false,
    console: false,
    Map: false,
    Proxy: false,
  },
  plugins: [],
  rules: {
    "require-jsdoc": "error",
    "no-warning-comments": "warn",
    // "@mysticatea/no-use-ignored-vars": ["error", "^_[a-zA-Z]+$"],
    // "@mysticatea/node/no-extraneous-require": "warn",
    "no-implicit-globals": "off",
    "vue/comma-dangle": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/html-indent": "off",
    "vue/html-self-closing": "off",
    "vue/singleline-html-element-content-newline": "off",
  },
  overrides: [
    {
      files: ["*.mjs"],
      extends: ["plugin:@ota-meshi/recommended", "plugin:@ota-meshi/+prettier"],
      parserOptions: {
        sourceType: "module",
      },
    },
    {
      files: ["*.js"],
      extends: ["plugin:@ota-meshi/recommended", "plugin:@ota-meshi/+prettier"],
      parserOptions: {
        sourceType: "script",
      },
      rules: {
        "no-implicit-globals": "off",
      },
    },
    {
      files: ["*.json"],
      parser: "jsonc-eslint-parser",
      extends: ["plugin:@ota-meshi/+json", "plugin:@ota-meshi/+prettier"],
    },
  ],
};
