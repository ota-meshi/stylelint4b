"use strict"

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
                // "postcss-sass": "postcss-sass",
                // "postcss-scss": "postcss-scss",
                // "postcss-less": "postcss-less",
                // "postcss-html": "postcss-html",
                // sugarss: "sugarss",
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
