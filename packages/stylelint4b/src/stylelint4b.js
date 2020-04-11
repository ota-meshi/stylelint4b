"use strict"

const bundle = require("./index")

const stylelint = bundle.index
const alias = bundle.alias
stylelint.defineAlias = alias.defineAlias
stylelint.defineAliases = alias.defineAliases

module.exports = stylelint
