import {noop} from './noop'

/**
 * Set delay for action
 *
 * @format
 * @param {number} time
 * @param {Function} callback
 * @return {Promise}
 */
export function delay(time, callback = noop) {
  return new Promise((resolve) => setTimeout(resolve, time)).then(() => {
    callback()
  })
}
