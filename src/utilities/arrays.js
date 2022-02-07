/**
 * Returns the first item of an array
 * @param  {Array} array The array.
 * @returns {any}
 */
export const first = (array = []) => array[0]

/**
 * Returns the last item of an array
 * @param   {Array} array The array.
 * @returns {any}
 */
export const last = (array = []) => array[array.length - 1]

/**
 * Returns a random item from an array
 *
 * @param   {Array} array The array.
 * @returns {any}
 */
export const random = (array = []) => {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Determines if an array contains an item. Small polyfill for Array.includes.
 *
 * @param   {Array} array The array.
 * @param   {any} item The item to match.
 * @returns {boolean} The result.
 */
export const includes = (array = [], item) => {
  return array.indexOf(item) >= 0
}

/**
 * Simple polyfill for Array.prototype.find
 * @param   {Array} array The array.
 * @param   {Function} callback Callback to match.
 * @returns {boolean} The result.
 */
export const find = (array = [], callback = () => undefined) => {
  if (Array.prototype.find) return array.find(callback)

  return array.filter(callback)[0]
}
