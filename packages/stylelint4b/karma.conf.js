"use strict"

const baseConfig = require("./build/webpack.config.base")

module.exports = function(config) {
    config.set({
        frameworks: ["mocha"],
        files: ["tests/**/*.js"],
        preprocessors: {
            "**/*.js": ["webpack"],
        },
        webpack: {
            mode: "development",
            externals: {
                "postcss-styl": "42",
                sugarss: "42",
                "postcss-sass": "42",
                // "postcss-scss": "postcss-scss",
                // "postcss-less": "postcss-less",
                // "postcss-html": "postcss-html",
            },
            resolve: {
                ...baseConfig.resolve,
                alias: {
                    ...baseConfig.resolve.alias,
                    // eslint-disable-next-line @mysticatea/node/no-extraneous-require
                    htmlparser2: require.resolve("htmlparser2"),
                },
            },
        },
        reporters: ["spec"],
        customLaunchers: {
            ChromeForCI: {
                base: "ChromeHeadless",
                flags: ["--no-sandbox"],
            },
        },
    })
}
