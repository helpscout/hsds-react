/**
 * Returns the first item of an array
 * @param  {Array} array The array.
 * @returns {any}
 */
export const first = (array: Array<any> = []): any => array[0]

/**
 * Returns the last item of an array
 * @param   {Array} array The array.
 * @returns {any}
 */
export const last = (array: Array<any> = []): any => array[array.length - 1]

/**
 * Returns a random item from an array
 *
 * @param   {Array} array The array.
 * @returns {any}
 */
export const random = (array: Array<any> = []): any => {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Determines if an array contains an item. Small polyfill for Array.includes.
 *
 * @param   {Array} array The array.
 * @param   {any} item The item to match.
 * @returns {boolean} The result.
 */
export const includes = (array: Array<any> = [], item: any): boolean => {
  return array.indexOf(item) >= 0
}
