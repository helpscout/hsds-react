import isArray from 'lodash.isarray'

/**
 * Determines if something is defined.
 *
 * @param   {any} obj
 * @returns {boolean}
 */
export const isDefined = obj => obj !== undefined && obj !== null

/**
 * Determines if at least one object from a collection is defined.
 *
 * @param   {array} ojbs
 * @returns {boolean}
 */
export const anyDefined = objs => {
  if (!objs) return false
  const props = isArray(objs) ? objs : Object.values(objs)
  return props.filter(isDefined).length >= 1
}

/**
 * Determines if all objects from a collection are defined.
 */
export const allDefined = objs => {
  if (!objs) return false
  const props = isArray(objs) ? objs : Object.values(objs)
  return props.filter(isDefined).length === props.length
}
