/**
 * Clear all data local storage
 */
export function clear() {
  localStorage.clear()
}

/**
 * Get value from local storage by key
 *
 * @param {string} key key
 * @param {Object} defaultValue Default value when key not found
 * @returns
 */
export function get(key, defaultValue = {}) {
  return localStorage.getItem(key) || defaultValue
}

/**
 * Set {key, value} to local storage
 *
 * @param {string} key
 * @param {string | object} value
 */
export function set(key, value) {
  localStorage.setItem(
    key,
    typeof value === 'object' ? JSON.stringify(value) : value
  )
}

/**
 * Remove
 *
 * @param {string} key
 */
export function remove(key) {
  localStorage.removeItem(key)
}

/**
 * Get multi variables from local storage
 *
 * @param {string[]} keys
 * @returns {Object}
 */
export function multiGet(...keys) {
  return {}
}

/**
 * Remove multi variables from local storage
 *
 *  @param {string[]} keys
 */
export function multiRemove(...keys) {}
