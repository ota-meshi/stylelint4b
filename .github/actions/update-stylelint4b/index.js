"use strict"

const core = require("@actions/core")
const result = require("../../../packages/stylelint4b/scripts/lib/stylelint-ver-sync")()

core.setOutput("updated", result ? 1 : 0)
