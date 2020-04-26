"use strict"

const fs = require("fs")
const spawn = require("cross-spawn")
const packageJsonPath = require.resolve("../../package.json")

module.exports = function() {
    const oldStylelintVersion = JSON.parse(
        fs.readFileSync(packageJsonPath, "utf8"),
    ).devDependencies.stylelint
    spawn.sync(
        "npm",
        [
            "i",
            "-D",
            "stylelint@latest",
            "stylelint-config-recommended@latest",
            "stylelint-config-standard@latest",
        ],
        {
            stdio: "inherit",
        },
    )
    const newStylelintVersion = JSON.parse(
        fs.readFileSync(packageJsonPath, "utf8"),
    ).devDependencies.stylelint

    if (oldStylelintVersion === newStylelintVersion) {
        return null
    }
    return newStylelintVersion
}
