"use strict";

const path = require("path");
const { build } = require("./build-system/build");

// eslint-disable-next-line no-process-env -- log
console.log(`NODE_ENV=${process.env.NODE_ENV}`);

console.log("run make-modules script");
require("./build-system/make-modules");
console.log("end make-modules script");

const REPLACEMENT_MODULES = {
  [require.resolve("stylelint/lib/utils/FileCache")]: require.resolve(
    "../src/replacement/stylelint/lib/utils/FileCache"
  ),
  [require.resolve("stylelint/lib/utils/getModulePath")]: require.resolve(
    "../src/replacement/stylelint/lib/utils/getModulePath"
  ),
  [require.resolve("stylelint/lib/utils/isPathNotFoundError")]: require.resolve(
    "../src/replacement/stylelint/lib/utils/isPathNotFoundError"
  ),
  [require.resolve("stylelint/lib/formatters/index")]: require.resolve(
    "../src/replacement/stylelint/lib/formatters/index"
  ),
};
const REPLACEMENT_TEXTS = {
  [require.resolve("stylelint/lib/rules/index")](code) {
    return code.replace(
      /importLazy\(\s*(["'][^"'].*[^"']["']),?\s*\)/gu,
      "require($1)"
    );
  },
  [require.resolve("stylelint/lib/rules/function-no-unknown")](code) {
    return code.replace(
      /JSON.parse\([^\n]+\)/u,
      "require('css-functions-list/index.json')"
    );
  },
};

build(
  require.resolve("../src/stylelint4b.mjs"),
  path.resolve(__dirname, "../dist/stylelint4b.js"),
  {
    replaceModules: REPLACEMENT_MODULES,
    replaceTexts: REPLACEMENT_TEXTS,
  }
);
