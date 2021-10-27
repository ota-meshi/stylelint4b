"use strict"

const fs = require("fs")
const path = require("path")
const eslint = require("../../../../node_modules/eslint")
const RULES_ROOT = path.resolve(
    __dirname,
    "../../node_modules/stylelint/lib/rules",
)
const REFERENCE_ROOT = path.resolve(
    __dirname,
    "../../node_modules/stylelint/lib/reference",
)
const UTILS_ROOT = path.resolve(
    __dirname,
    "../../node_modules/stylelint/lib/utils",
)

clearDir(path.resolve(__dirname, "../../lib/reference"))
clearDir(path.resolve(__dirname, "../../lib/rules"))
clearDir(path.resolve(__dirname, "../../lib/utils"))
clearDir(path.resolve(__dirname, "../../packages/postcss"))

const targets = [
    {
        module: "stylelint",
        name: "index",
    },
    {
        module: "./alias-module",
        name: "alias",
    },
]

// eslint-disable-next-line require-jsdoc
function isDirectory(s) {
    return fs.lstatSync(s).isDirectory()
}

targets.push(
    ...fs
        .readdirSync(RULES_ROOT)
        .filter(file => isDirectory(path.resolve(RULES_ROOT, file)))
        .map(file => ({
            module: `stylelint/lib/rules/${file}`,
            name: `lib/rules/${file}`,
        })),
)

targets.push(
    ...fs
        .readdirSync(REFERENCE_ROOT)
        .filter(file => path.extname(file) === ".js")
        .map(file => path.basename(file, ".js"))
        .map(file => ({
            module: `stylelint/lib/reference/${file}`,
            name: `lib/reference/${file}`,
        })),
)
targets.push(
    ...fs
        .readdirSync(UTILS_ROOT)
        .filter(file => path.extname(file) === ".js")
        .map(file => path.basename(file, ".js"))
        .filter(
            file =>
                file !== "getCacheFile" &&
                file !== "getFileIgnorer" &&
                file !== "FileCache",
        )
        .map(file => ({
            module: `stylelint/lib/utils/${file}`,
            name: `lib/utils/${file}`,
        })),
)
const postcssExports = require("postcss/package.json").exports
targets.push(
    ...Object.keys(postcssExports)
        .filter(key => typeof postcssExports[key] === "string")
        .filter(key => path.extname(postcssExports[key]) === ".js")
        .map(key => ({
            module: path.join("postcss", key),
            name: path.join("packages/postcss", key),
        })),
    {
        module: "postcss/lib/postcss",
        name: "packages/postcss/index",
    },
)

const indexPath = path.resolve(__dirname, "../../src/index.js")

writeFileSync(
    indexPath,
    `"use strict"
/* eslint @mysticatea/eslint-comments/no-use: 0, @mysticatea/eslint-comments/no-unused-disable: 0, @mysticatea/node/no-extraneous-require: 0 */

module.exports = {
  ${targets
      .map(target => `"${target.name}": require("${target.module}")`)
      .join(",\n")}
}`,
)

const formatFiles = [indexPath]
for (const target of targets) {
    const libPath = path.resolve(__dirname, `../../${target.name}.js`)
    const level = target.name.split("/").length - 1
    writeFileSync(
        libPath,
        `"use strict"

        const bundle = require("${
            level ? "../".repeat(level) : "./"
        }dist/bundle")
        
        module.exports = bundle["${target.name}"]
        `,
    )
    formatFiles.push(libPath)
}

const linter = new eslint.CLIEngine({ fix: true })
const report = linter.executeOnFiles(formatFiles)
eslint.CLIEngine.outputFixes(report)

// eslint-disable-next-line require-jsdoc
function clearDir(dir) {
    if (!isExist(dir)) {
        return
    }
    for (const file of fs.readdirSync(dir)) {
        const fp = path.join(dir, file)
        if (fs.statSync(fp).isDirectory()) {
            clearDir(fp)
        } else {
            fs.unlinkSync(fp)
        }
    }
}

// eslint-disable-next-line require-jsdoc
function isExist(file) {
    try {
        fs.statSync(file)
        return true
    } catch (err) {
        if (err.code === "ENOENT") {
            return false
        }
        throw err
    }
}

// eslint-disable-next-line require-jsdoc
function writeFileSync(file, ...args) {
    const parents = []
    let parent = path.dirname(file)
    while (!isExist(parent)) {
        parents.push(parent)
        parent = path.dirname(parent)
    }
    while (parents.length) {
        fs.mkdirSync(parents.pop())
    }
    fs.writeFileSync(file, ...args)
}
