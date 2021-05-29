/**
 * @format
 * @param {number} time
 * @param {Function} callback
 */
export const delay = (time, callback) =>
  new Promise((resolve) => setTimeout(resolve, time)).then((_) =>
    callback ? callback(_) : _
  )
