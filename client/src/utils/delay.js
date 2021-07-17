import {noop} from './noop'

/**
 * @format
 * @param {number} time
 * @param {Function} callback
 */
export function delay(time, callback = noop) {
  return new Promise((resolve) => setTimeout(resolve, time)).then(() => {
    callback()
  })
}
