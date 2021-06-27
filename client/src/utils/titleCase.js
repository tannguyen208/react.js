import { join, map, split, toString, upperFirst } from 'lodash'

/**
 * Converts the first character of every word in `string` to upper case and the remaining
 * to lower case.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to title-case.
 * @returns {string} Returns the title-cased string.
 * @example
 *
 * titleCase('FRED FLINTSTONE')
 * // => 'Fred Flintstone'
 */
function titleCase(string) {
  return join(
    map(split(toString(string), ' '), function (word) {
      return upperFirst(word)
    }),
    ' '
  )
}

export { titleCase }
