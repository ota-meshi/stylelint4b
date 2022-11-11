"use strict";

module.exports = {
  extends: [require.resolve("../../.eslintrc.js")],
  rules: {},
  overrides: [
    {
      files: ["build/**/*.js"],
      extends: ["plugin:@ota-meshi/+node"],
    },
    {
      files: ["lib/**/*.js"],
      parserOptions: {
        sourceType: "module",
      },
    },
    {
      files: ["lib/**/*.vue"],
      extends: ["plugin:@ota-meshi/+vue2", "plugin:@ota-meshi/+prettier"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
};
