// @flow
import { isFunction } from '../../utilities/is'

/**
 * A helper function that works like Sass' @for.
 *
 * @param {Array<any>} list The list to iterate through.
 * @param {Function} callback Function to generate the styles.
 * @returns {string} The compiled CSS styles.
 */
const forEach = (list: Array<any>, callback: Function): string => {
  if (!Array.isArray(list) || !isFunction(callback)) return ''

  return list.map(callback).join(' ')
}

export default forEach
