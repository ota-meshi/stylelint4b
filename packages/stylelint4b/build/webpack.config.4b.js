/* eslint-disable no-process-env */
"use strict"

const webpack = require("webpack")
const { merge } = require("webpack-merge")
const path = require("path")
const base = require("./webpack.config.base")

// eslint-disable-next-line no-console
console.log(`NODE_ENV=${process.env.NODE_ENV}`)

/**
 * @type {webpack.Configuration}
 */
module.exports = merge(base, {
    mode: process.env.NODE_ENV || "production",
    /* eslint-enable no-process-env */
    entry: {
        stylelint4b: require.resolve("../src/stylelint4b.js"),
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../dist"),
        library: {
            type: "umd",
            name: "[name]",
        },
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
    ],
})
