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
