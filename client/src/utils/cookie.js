export function set(name, value, options) {
  const optionsWithDefaults = {
    days: 7,
    path: '/',
    ...options,
  }

  const expires = new Date(
    Date.now() + optionsWithDefaults.days * 864e5
  ).toUTCString()

  document.cookie =
    name +
    '=' +
    encodeURIComponent(value) +
    '; expires=' +
    expires +
    '; path=' +
    optionsWithDefaults.path
}

export function get(name, initialValue = '') {
  const value = document.cookie.split('; ').reduce((acc, cur) => {
    const parts = cur.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : acc
  }, '')

  return value || initialValue
}
