import isFunction from 'lodash.isfunction'
import isPlainObject from 'lodash.isplainobject'

/**
 * A helper function that works like Sass' @for.
 *
 * @param {Array<any> | Object} list The list to iterate through.
 * @param {Function} callback Function to generate the styles.
 * @returns {string} The compiled CSS styles.
 */
const forEach = (list = [], callback) => {
  if (!isFunction(callback)) return ''

  if (Array.isArray(list)) {
    return list.map(callback).join(' ')
  }

  if (isPlainObject(list)) {
    return Object.keys(list)
      .map((key, index) => callback(key, list[key], index))
      .join(' ')
  }

  return ''
}

export default forEach
