"use strict"

const path = require("path-browserify")

module.exports = {
    ...path,
    isAbsolute() {
        return true
    },
}
