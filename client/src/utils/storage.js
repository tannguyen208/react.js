export function clear() {
  return localStorage.clear()
}

/**
 * @param {string} key
 */
export function get(key, defaultValue = {}) {
  return localStorage.getItem(key) || defaultValue
}

/**
 * @param {string} key
 * @param {string | object} value
 */
export function set(key, value) {
  return localStorage.setItem(
    key,
    typeof value === 'object' ? JSON.stringify(value) : value
  )
}

/**
 * @param {string} key
 */
export function remove(key) {
  return localStorage.removeItem(key)
}

/**
 * @param {string[]} keys
 */
export function multiGet(...keys) {
  return {}
}

/**
 * @param {string[]} keys
 */
export function multiRemove(...keys) {}
