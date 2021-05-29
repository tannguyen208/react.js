/**
 * Guard Middleware
 * Checking for arguments is boolean or function => boolean
 *
 * @format
 * @default false
 */
export function isGuard() {
  const isBool = (key) => typeof key === 'boolean'
  const isFunc = (key) => typeof key === 'function'

  const canActive = []

  for (let i = 0; i < arguments.length; i++) {
    // check canActive is boolean param
    if (isBool(arguments[i])) canActive.push(arguments[i])
    // check canActive is function param
    else if (isFunc(arguments[i])) canActive.push(arguments[i]() || false)
    // return false if arguments[i] is undefined, null, object, ...
    else canActive.push(false)
  }

  return canActive.reduce((acc, cur) => acc && cur, true)
}
