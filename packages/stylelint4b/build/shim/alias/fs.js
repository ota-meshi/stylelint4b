"use strict";

/**
 * Create fake ENOENT Error
 * @param {*} path path
 */
function createFakeEnoentError(path) {
  const err = new Error(`Fake Error: ENOENT: on \`${path}\``);
  err.code = "ENOENT";
  return err;
}

module.exports = {
  readFile(path, _options, callback) {
    callback(createFakeEnoentError(path));
  },
  readFileSync(path) {
    throw createFakeEnoentError(path);
  },
  realpathSync(path) {
    throw createFakeEnoentError(path);
  },
};
