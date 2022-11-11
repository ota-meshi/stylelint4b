"use strict";

const path = require("path");
const { build } = require("./build-system/build");

let queue = Promise.resolve();

// eslint-disable-next-line no-process-env -- log
console.log(`NODE_ENV=${process.env.NODE_ENV}`);

console.log("run make-modules script");
queue = queue.then(async () => {
  await require("./build-system/make-modules").make();
  console.log("end make-modules script");
});

const REPLACEMENT_MODULES = {
  // Replace with stub class.
  [require.resolve("stylelint/lib/utils/FileCache")]: require.resolve(
    "./shim/replacement/stylelint/lib/utils/FileCache"
  ),
  // Replace with stub function.
  [require.resolve("stylelint/lib/utils/getModulePath")]: require.resolve(
    "./shim/replacement/stylelint/lib/utils/getModulePath"
  ),
  // Replace with stub function.
  [require.resolve("stylelint/lib/utils/isPathNotFoundError")]: require.resolve(
    "./shim/replacement/stylelint/lib/utils/isPathNotFoundError"
  ),
  // Replace with stub object.
  [require.resolve("stylelint/lib/formatters/index")]: require.resolve(
    "./shim/replacement/stylelint/lib/formatters/index"
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

// Replaces external modules and node's built-in modules.
const ALIAS = {
  // Replace with require-shim. See ../src/require-shim.js
  "import-fresh": require.resolve("./shim/alias/import-fresh.js"),
  // Replace with an object whose load function resolves from the user-specified alias module instead of the file system.
  cosmiconfig: require.resolve("./shim/alias/cosmiconfig.js"),
  // Replace with a module that raises an ENOENT error.
  fs: require.resolve("./shim/alias/fs.js"),
  // Replace with a module that only has EOL.
  os: require.resolve("./shim/alias/os.js"),
  // Mostly the same as path-browserify except isAbsolute always returns true.
  path: require.resolve("./shim/alias/path.js"),
  // Replace with fake data
  "css-functions-list": require.resolve("./shim/alias/css-functions-list.js"),
  // remove (replace with empty object)
  "fast-glob": require.resolve("./shim/alias/_empty.js"),
  globby: require.resolve("./shim/alias/_empty.js"),
  "write-file-atomic": require.resolve("./shim/alias/_empty.js"),
};
queue.then(() => {
  return build(
    require.resolve("../src/stylelint4b.mjs"),
    path.resolve(__dirname, "../dist/stylelint4b.js"),
    {
      replaceModules: REPLACEMENT_MODULES,
      replaceTexts: REPLACEMENT_TEXTS,
      alias: ALIAS,
    }
  );
});
