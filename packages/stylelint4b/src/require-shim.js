"use strict"

const alias = require("./alias-module")
const MODULES = {
    /* eslint-disable @mysticatea/node/no-extraneous-require */
    postcss: () => require("postcss"),
    "postcss-safe-parser": () => require("postcss-safe-parser"),
    // "postcss-scss": () => require("postcss-scss"),
    // "postcss-less": () => require("postcss-less"),
    // "postcss-sass": () => require("postcss-sass"),
    // "postcss-html": () => require("postcss-html"),
    // "postcss-styl": () => require("postcss-styl"),
    // sugarss: () => require("sugarss"),
    /* eslint-enable @mysticatea/node/no-extraneous-require */
}

/**
 * @param {string} moduleId
 */
function requireFunction(moduleId) {
    if (moduleId != null && typeof moduleId === "object") {
        return moduleId
    }
    let moduleIdAct = String(moduleId)
    if (moduleIdAct.startsWith("./node_modules/")) {
        moduleIdAct = moduleIdAct.slice(15)
    }
    if (alias.has(moduleId)) {
        return alias.get(moduleId)
    }
    if (MODULES[moduleIdAct]) {
        return MODULES[moduleIdAct]()
    }
    return alias.get(moduleId)
}

requireFunction.resolve = function(p) {
    return p
}
module.exports = requireFunction
