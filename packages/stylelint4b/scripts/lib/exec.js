"use strict"

const path = require("path")
const spawn = require("cross-spawn")
const packageJsonPath = require.resolve("../../package.json")

/** Execute command */
module.exports = {
    exec(command, args) {
        const originalCwd = process.cwd()
        try {
            process.chdir(path.dirname(packageJsonPath))
            const result = spawn.sync(command, args, {
                windowsHide: true,
                maxBuffer: Infinity,
            })

            if (result.error) {
                throw result.error
            }
            if (result.status !== 0) {
                throw new Error(
                    `Failed:\n${result.stdout.toString()}\n${result.stderr.toString()}`,
                )
            }
            return result.stdout.toString("utf8")
        } finally {
            process.chdir(originalCwd)
        }
    },
    execInherit(command, args) {
        const originalCwd = process.cwd()
        try {
            process.chdir(path.dirname(packageJsonPath))
            spawn.sync(command, args, {
                stdio: "inherit",
            })
        } finally {
            process.chdir(originalCwd)
        }
    },
}
