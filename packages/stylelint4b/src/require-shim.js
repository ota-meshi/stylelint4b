"use strict"

const MODULES = {
    /* eslint-disable @mysticatea/node/no-extraneous-require */
    postcss: require("postcss"),
    "postcss-safe-parser": require("postcss-safe-parser"),
    "postcss-scss": require("postcss-scss"),
    "postcss-less": require("postcss-less"),
    "postcss-sass": require("postcss-sass"),
    "postcss-html": require("postcss-html"),
    "postcss-jsx": require("postcss-jsx"),
    "postcss-markdown": require("postcss-markdown"),
    /* eslint-enable @mysticatea/node/no-extraneous-require */
}

const DIRECT_MODULES = {
    "postcss/lib/"(moduleId) {
        return require(`postcss/lib/${moduleId.slice(12)}.js`)
    },
    "postcss-html/"(moduleId) {
        return require(`postcss-html/${moduleId.slice(13)}.js`)
    },
}

/**
 * @param {string} moduleId
 */
function requireFunction(moduleId) {
    if (moduleId != null && typeof moduleId === "object") {
        return moduleId
    }
    let moduleIdAct = moduleId
    if (moduleIdAct.startsWith("./node_modules/")) {
        moduleIdAct = moduleIdAct.slice(15)
    }
    if (MODULES[moduleIdAct]) {
        return MODULES[moduleIdAct]
    }
    for (const modulePrefix of Object.keys(DIRECT_MODULES)) {
        if (moduleIdAct.startsWith(modulePrefix)) {
            return DIRECT_MODULES[modulePrefix](moduleIdAct)
        }
    }
    console.error(`not found module:${moduleIdAct}`)
    throw new Error(`not found module:${moduleIdAct}`)
}

requireFunction.resolve = function(p) {
    return p
}
module.exports = requireFunction
