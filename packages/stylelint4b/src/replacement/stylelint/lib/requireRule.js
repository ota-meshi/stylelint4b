"use strict"

const rules = require("stylelint/lib/rules")

/**
 * @param {string} ruleName
 * @returns {false|any}
 */
module.exports = function(ruleName) {
    if (rules.includes(ruleName)) {
        return require(`stylelint/lib/rules/${ruleName}/index.js`)
    }

    return false
}
