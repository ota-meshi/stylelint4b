"use strict";

/**
 * @typedef {import('esbuild').Plugin} Plugin
 */

/**
 * @param {*} options
 * @returns {Plugin}
 */
module.exports = (options) => {
  const files = Object.keys(options);
  const filter = new RegExp(
    `(?:${files.map((x) => escapeRegExp(x)).join("|")})`,
    "u"
  );

  /** Resolve path from options */
  function resolve(originalPath) {
    if (options[originalPath]) {
      return options[originalPath];
    }
    return null;
  }

  return {
    name: "alias",
    setup(build) {
      build.onResolve({ filter }, (args) => {
        if (!args.path || args.path.startsWith(".")) {
          return null;
        }
        const newPath = resolve(args.path);
        if (newPath) {
          return {
            path: newPath,
          };
        }
        return null;
      });
    },
  };
};

/** Escape */
function escapeRegExp(string) {
  return string.replace(/[$()*+.?[\\\]^{|}]/gu, "\\$&");
}
