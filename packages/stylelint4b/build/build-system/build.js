"use strict";

const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

module.exports = { build };

/**
 * build with esbuild
 * @param {string} input
 * @param {string} out
 */
async function build(input, out, { replaceModules, replaceTexts, alias }) {
  console.log(`build@ ${input}`);
  let code = await bundle(input, { replaceModules, replaceTexts, alias });
  code = transform(code);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, code, "utf8");
}

/** bundle */
async function bundle(entryPoint, { replaceModules, replaceTexts, alias }) {
  const result = await esbuild.build({
    entryPoints: [entryPoint],
    target: "es2017",
    format: "iife",
    bundle: true,
    // external: externals,
    write: false,
    inject: [require.resolve("./injects/process.mjs")],
    plugins: [
      replaceModules
        ? require("./plugins/replacement-module")(replaceModules)
        : null,
      replaceTexts ? require("./plugins/replacement-code")(replaceTexts) : null,
      alias ? require("./plugins/alias")(alias) : null,
    ].filter(Boolean),
    // eslint-disable-next-line no-process-env -- env
    minify: (process.env.NODE_ENV || "production") === "production",
  });

  return `${result.outputFiles[0].text}`;
}

/** transform code */
function transform(code) {
  return `${code}`;
}
