// @flow
/**
 * Returns the first item of an array
 * @param  {array} - array
 * @returns {any}
 */
export const first = (array: Array<any> = []): any => array[0]

/**
 * Returns the last item of an array
 * @param   {array} - array
 * @returns {any}
 */
export const last = (array: Array<any> = []): any => array[array.length - 1]

/**
 * Returns a random item from an array
 *
 * @param   {array} - array
 * @returns {any}
 */
export const random = (array: Array<any> = []): any => {
  return array[Math.floor(Math.random() * array.length)]
}
