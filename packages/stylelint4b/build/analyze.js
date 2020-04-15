"use strict"

const webpack = require("webpack")
const analyzer = require("./webpack.config.analyzer")

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

webpack(analyzer, (...args) => {
    callback(...args)
})
