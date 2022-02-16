import isArray from 'lodash.isarray'
import { random } from './arrays'

/**
 * Returns a random item from a collection
 *
 * @param  {Array|Object} collection
 * @returns {any}
 */
export const sample = collection => {
  if (!collection) return undefined
  if (isArray(collection)) return random(collection)
  const key = random(Object.keys(collection))
  return collection[key]
}
