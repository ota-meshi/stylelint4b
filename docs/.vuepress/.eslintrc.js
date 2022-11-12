module.exports = {
  parserOptions: {
    sourceType: "module",
  },
  globals: {
    window: true,
    require: true,
    Uint8Array: true,
    TextDecoder: true,
    TextEncoder: true,
  },
  rules: {
    "@mysticatea/node/no-unsupported-features/es-syntax": "off",
  },
  overrides: [
    {
      files: ["*.vue"],
      extends: ["plugin:@ota-meshi/+vue2", "plugin:@ota-meshi/+prettier"],
      parserOptions: {
        sourceType: "module",
      },
      parser: "vue-eslint-parser",
    },
  ],
};
