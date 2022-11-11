"use strict"

module.exports = function(config) {
    config.set({
        frameworks: ["mocha", "webpack"],
        files: ["tests/**/*.js"],
        preprocessors: {
            "**/tests/**/*.js": ["webpack"],
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
                alias: {
                    // eslint-disable-next-line @mysticatea/node/no-extraneous-require
                    htmlparser2: require.resolve("htmlparser2"),
                    path: require.resolve("./src/alias/path"),
                    module: require.resolve("./src/alias/_empty"),
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
