// @flow
import { isObject, isFunction } from '../../utilities/is'

type List = Array<any> | Object

/**
 * A helper function that works like Sass' @for.
 *
 * @param {Array<any> | Object} list The list to iterate through.
 * @param {Function} callback Function to generate the styles.
 * @returns {string} The compiled CSS styles.
 */
const forEach = (list: List, callback: Function): string => {
  if ((!Array.isArray(list) && !isObject(list)) || !isFunction(callback))
    return ''

  if (isObject(list)) {
    return (
      // $FlowFixMe
      Object.keys(list)
        // $FlowFixMe
        .map((key, index) => callback(key, list[key], index))
        .join(' ')
    )
  }

  return list.map(callback).join(' ')
}

export default forEach
