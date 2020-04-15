"use strict"

// eslint-disable-next-line no-unused-vars
const webpack = require("webpack")
const merge = require("webpack-merge")
const condig = require("./webpack.config.stylelint")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

/**
 * @type {webpack.Configuration}
 */
module.exports = merge(condig, {
    plugins: [new BundleAnalyzerPlugin()],
})
