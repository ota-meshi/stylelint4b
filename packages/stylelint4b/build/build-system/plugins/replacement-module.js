"use strict";

const path = require("path");
const Module = require("module");

/**
 * @typedef {import('esbuild').Plugin} Plugin
 */

/**
 * @param {*} options
 * @returns {Plugin}
 */
module.exports = (options) => {
  const files = Object.keys(options).map((key) => {
    let baseName = path.basename(key, path.extname(key));
    if (baseName === "index") {
      baseName = path.basename(path.dirname(key));
    }
    return baseName;
  });
  const filter = new RegExp(
    `(?:${files.map((x) => escapeRegExp(x)).join("|")})`,
    "u",
  );

  /** Resolve path from options */
  function resolve(originalPath, moduleRequire) {
    if (options[originalPath]) {
      return options[originalPath];
    }

    for (const entry of Object.entries(options)) {
      try {
        if (
          entry[0].startsWith(".") &&
          moduleRequire.resolve(entry[0]) === originalPath
        ) {
          return entry[1];
        }
      } catch (_e) {
        // ignore
      }
    }
    return null;
  }

  return {
    name: "replacement-module",
    setup(build) {
      build.onResolve({ filter }, (args) => {
        if (!args.path || !args.importer) {
          return null;
        }
        try {
          const moduleRequire = Module.createRequire(args.importer);
          const originalPath = moduleRequire.resolve(args.path);
          const newPath = resolve(originalPath, moduleRequire);
          if (newPath) {
            return {
              path: newPath,
            };
          }
        } catch (_e) {
          // ignore
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
