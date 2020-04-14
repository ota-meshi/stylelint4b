/* eslint-disable no-process-env */
"use strict"

// eslint-disable-next-line no-unused-vars
const webpack = require("webpack")
const merge = require("webpack-merge")
const path = require("path")
const base = require("./webpack.config.base")

// eslint-disable-next-line no-console
console.log(`NODE_ENV=${process.env.NODE_ENV}`)

/**
 * @type {webpack.Configuration}
 */
module.exports = merge(base, {
    // target: "node",
    mode: process.env.NODE_ENV || "production",
    /* eslint-enable no-process-env */
    optimization: {
        minimize: false,
    },
    entry: {
        bundle: require.resolve("../src/index.js"),
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../dist"),
        library: ["[name]"],
        libraryTarget: "commonjs2",
    },
})
