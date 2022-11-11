"use strict";

/**
 * Create dummy ENOENT Error
 * @param {*} path path
 */
function createDummyEnoentError(path) {
  const err = new Error(`Dummy Error: ENOENT: on \`${path}\``);
  err.code = "ENOENT";
  return err;
}

module.exports = {
  readFile(path, _options, callback) {
    callback(createDummyEnoentError(path));
  },
  readFileSync(path) {
    throw createDummyEnoentError(path);
  },
  realpathSync(path) {
    throw createDummyEnoentError(path);
  },
};
