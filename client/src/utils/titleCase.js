import join from 'lodash/join'
import map from 'lodash/map'
import split from 'lodash/split'
import toString from 'lodash/toString'
import upperFirst from 'lodash/upperFirst'

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
 * titleCase('Nguyen Anh TAN')
 */
function titleCase(string) {
  return join(
    map(split(toString(string), ' '), (word) => upperFirst(word)),
    ' '
  )
}

export {titleCase}
