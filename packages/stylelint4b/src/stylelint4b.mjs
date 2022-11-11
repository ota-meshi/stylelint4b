/* globals define, globalThis  */

import bundle from "./index"
import requireFunction from "./require-shim"

// Hack! override require function
// eslint-disable-next-line no-global-assign
require = function(m) {
    return requireFunction(m)
}

const stylelint = bundle.index
const alias = bundle.alias
stylelint.defineAlias = alias.defineAlias
stylelint.defineAliases = alias.defineAliases
stylelint._bundle = bundle

umd(stylelint)

/** Export module */
function umd(stylelint4b) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = stylelint4b
    } else if (typeof define === "function" && define.amd) {
        define([], () => stylelint4b)
    } else {
        globalThis.stylelint4b = stylelint4b
    }
}
