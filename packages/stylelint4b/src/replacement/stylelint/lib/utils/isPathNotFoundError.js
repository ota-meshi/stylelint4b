"use strict";

/**
 * @param {unknown} error
 * @returns {error is NodeJS.ErrnoException}
 */
module.exports = function isPathNotFoundError(error) {
  // @ts-expect-error -- TS2339: Property 'code' does not exist on type 'Error'.
  return error.code === "ENOENT";
};
