"use strict";

const fs = require("fs");
const packageJsonPath = require.resolve("../../package.json");
const semver = require("semver");
const { exec, execInherit } = require("./exec");

module.exports = function () {
  const stylelint4bVersion = [
    JSON.parse(exec("npm", ["view", "stylelint4b", "version", "--json"])),
  ]
    .flat()
    .reduce((mv, v) => (semver.lt(mv, v) ? v : mv));

  const oldDependencies = JSON.parse(
    fs.readFileSync(packageJsonPath, "utf8")
  ).devDependencies;

  const stylelintMaxVersion = [
    JSON.parse(
      exec("npm", [
        "view",
        `stylelint@${oldDependencies.stylelint}`,
        "version",
        "--json",
      ])
    ),
  ]
    .flat()
    .reduce((mv, v) => (semver.lt(mv, v) ? v : mv));
  if (semver.lte(stylelintMaxVersion, stylelint4bVersion)) {
    return null;
  }

  execInherit("npm", ["i", "-D", `stylelint@^${stylelintMaxVersion}`]);
  return stylelintMaxVersion;
};
