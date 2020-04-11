"use strict"

const alias = require("../alias-module")
module.exports = {
    cosmiconfig,
}

const stylelintConfigs = {
    "stylelint-config-standard": require("stylelint-config-standard"),
    "stylelint-config-recommended": require("stylelint-config-recommended"),
}

/**
 *
 * @param {string} moduleName
 * @param {object} options
 */
function cosmiconfig(_moduleName, { transform }) {
    return {
        async load(filepath) {
            const config = stylelintConfigs[filepath] || alias.get(filepath)
            const cosmiconfigResult = {
                config,
                filepath,
            }
            const value = await transform(cosmiconfigResult)
            return value
        },
    }
}
