/**
 * Set value to cookie
 *
 * @param {string} name Key saving cookie
 * @param {string} value Value saving cookie
 * @param {Object} options
 */
export function set(name, value, options) {
  const optionsWithDefaults = {
    days: 7,
    path: '/',
    ...options,
  }
  const encode = encodeURIComponent(value)
  const expires = new Date(
    Date.now() + optionsWithDefaults.days * 864e5
  ).toUTCString()

  document.cookie = `${name}=${encode}; expires=${expires}; path=${optionsWithDefaults.path}`
}

/**
 * Get value by name
 *
 * @param {string} name Name of cookie
 * @param {string} initialValue Return if cookie not found
 * @returns string
 */
export function get(name, initialValue = '') {
  const value = document.cookie.split('; ').reduce((acc, cur) => {
    const parts = cur.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : acc
  }, '')

  return value || initialValue
}
