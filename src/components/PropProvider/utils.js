// @flow
import { isArray, isObject, isFunction, isString } from '../../utilities/is'

export type ConfigGetter = Array<string> | string | ((config: Object) => {})

// Default configs
export const contextConfig = {}

/**
 * Attempts to retrieve the specified config props.
 *
 * @param  {Object} config The PropProvider configs.
 * @param  {Array<string> | Function | Object | string} getter The namespace of the config.
 * @return {Object} The retrieved config props.
 */
export function getConfigProps(
  config: Object = contextConfig,
  getter: ConfigGetter = ''
): Object {
  let props = {}

  if (isString(getter)) {
    props = config.hasOwnProperty(getter) ? config[getter] : {}
  }
  if (isFunction(getter)) {
    // $FlowFixMe
    props = getter(config)
  }
  if (isArray(getter)) {
    // $FlowFixMe
    props = getConfigPropsFromArray(config, getter)
  }

  if (isObject(getter)) {
    // $FlowFixMe
    const propKeys = Object.keys(getter).filter(key => getter[key])
    props = getConfigPropsFromArray(config, propKeys)
  }

  return props
}

/**
 * Retrieves props from a config (Object), given a collection of keys.
 *
 * @param   {Object} config The initial config.
 * @param   {Array<string>} array A collection of keys to get.
 * @returns {Object} The remapped config.
 */
export function getConfigPropsFromArray(
  config: Object = {},
  array: Array<string>
): Object {
  if (!isObject(config)) return {}
  if (!isArray(array)) return config

  return array.filter(value => isString(value)).reduce((remappedProps, key) => {
    remappedProps[key] = config[key]

    return remappedProps
  }, {})
}
