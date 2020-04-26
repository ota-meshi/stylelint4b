"use strict"

const semver = require("semver")
const spawn = require("cross-spawn")

const version = require("./lib/upgrade")()

if (!version) {
    return
}
console.log(`Upgrade stylelint@${version}`)
const newVersion = `${semver.coerce(version)}-4b.0`
console.log(`Update version stylelint4b@${newVersion}`)

spawn.sync("npm", ["version", newVersion], {
    stdio: "inherit",
})
