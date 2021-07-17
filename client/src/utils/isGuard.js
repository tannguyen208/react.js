/**
 * Guard Middleware
 * Checking for args is boolean or function => boolean
 *
 * @format
 * @default false
 */
export function isGuard(...args) {
  const isBool = (key) => typeof key === 'boolean'
  const isFunc = (key) => typeof key === 'function'

  const canActive = []

  for (let i = 0; i < args.length; i++) {
    // check canActive is boolean param
    if (isBool(args[i])) canActive.push(args[i])
    // check canActive is function param
    else if (isFunc(args[i])) canActive.push(args[i]() || false)
    // return false if args[i] is undefined, null, object, ...
    else canActive.push(false)
  }

  return canActive.reduce((acc, cur) => acc && cur, true)
}
