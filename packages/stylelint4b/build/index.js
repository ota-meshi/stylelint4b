"use strict"

const webpack = require("webpack")
const configStylelint = require("./webpack.config.stylelint")
const config4b = require("./webpack.config.4b")

console.log("run script")
require("./script")
console.log("end script")

/**
 * webpack callback
 * @param {*} err
 * @param {*} stats
 */
function callback(err, stats) {
    if (err) {
        console.error(err.stack || err)
        if (err.details) {
            console.error(err.details)
        }
        throw err
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
        for (const e of info.errors) {
            console.error(e)
        }
    }

    if (stats.hasWarnings()) {
        for (const e of info.warnings) {
            // eslint-disable-next-line no-console
            console.warn(e)
        }
    }
    // Done processing
}

webpack(configStylelint, (...args) => {
    callback(...args)

    webpack(config4b, callback)
})
