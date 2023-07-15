"use strict";

const path = require("path");
const fs = require("fs");

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

  /** Resolve transformer from options */
  function resolveTransformer(originalPath) {
    if (options[originalPath]) {
      return options[originalPath];
    }

    for (const entry of Object.entries(options)) {
      try {
        if (
          entry[0].startsWith(".") &&
          path.resolve(entry[0]) === originalPath
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
    name: "replacement-code",
    setup(build) {
      build.onLoad({ filter }, (args) => {
        if (!args.path) {
          return null;
        }

        const transformer = resolveTransformer(args.path);
        if (!transformer) {
          return null;
        }

        return {
          pluginName: "replacement-code",
          contents: transformer(fs.readFileSync(args.path, "utf8")),
        };
      });
    },
  };
};

/** Escape */
function escapeRegExp(string) {
  return string.replace(/[$()*+.?[\\\]^{|}]/gu, "\\$&");
}
