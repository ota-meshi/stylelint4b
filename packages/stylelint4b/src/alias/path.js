"use strict";

const path4b = require("path-browserify");

module.exports = {
  ...path4b,
  isAbsolute() {
    return true;
  },
};
