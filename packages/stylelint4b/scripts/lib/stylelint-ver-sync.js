"use strict";

const semver = require("semver");
const { execInherit } = require("./exec");

module.exports = function () {
  const version = require("./upgrade")();

  if (!version) {
    return null;
  }
  console.log(`Upgrade stylelint@${version}`);
  const newVersion = semver.coerce(version);
  console.log(`Update version stylelint4b@${newVersion}`);

  execInherit("npm", ["version", newVersion]);

  return version;
};
