"use strict"

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
            let config = undefined
            let resultFilepath = undefined
            if (typeof filepath === "string") {
                if (!stylelintConfigs[filepath]) {
                    throw new Error(`Unknown path ${filepath}`)
                }
                config = stylelintConfigs[filepath]
                resultFilepath = filepath
            } else {
                config = filepath
                resultFilepath = ""
            }
            const cosmiconfigResult = {
                config,
                filepath: resultFilepath,
            }
            const value = await transform(cosmiconfigResult)
            return value
        },
    }
}
