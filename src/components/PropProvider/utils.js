// @flow
import type { PropProviderProps, ConfigGetter } from './types'
import Logger from '../../utilities/Logger'
import {
  isArray,
  isObject,
  isFunction,
  isPlainObject,
  isString,
} from '../../utilities/is'
import { noop } from '../../utilities/other'

export const channel = '__BLUE_PROP_PROVIDER__'

export const contextTypes = {
  [channel]: noop,
}

// Default configs
export const contextConfig = {}

/**
 * Merges props with outerProps.
 *
 * @param   {Function|Object} props The PropProvider configs.
 * @param   {Object} outerProps The outer PropProvider configs.
 * @returns {Object} The merged props.
 */
export function getProps(
  props: PropProviderProps = {},
  outerProps?: Object
): Object {
  if (isFunction(props)) {
    const mergedProps = props(outerProps)
    if (!isPlainObject(mergedProps)) {
      return Logger.error(
        '[PropProvider] Please return an object from your value function, i.e. value={() => ({})}!'
      )
    }
    return mergedProps
  }
  if (!isPlainObject(props)) {
    return Logger.error(
      '[PropProvider] Please make your value prop a plain object'
    )
  }

  if (outerProps === undefined) {
    return props
  }

  return { ...outerProps, ...props }
}

/**
 * Attempts to retrieve the specified config props.
 *
 * @param   {Object} config The PropProvider configs.
 * @param   {Array<string> | Function | Object | string} getter The namespace of the config.
 * @returns {Object} The retrieved config props.
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

/**
 * Internally sets the Provider props within the connected component.
 *
 * @param {Object} providerProps The Provider prop (value)
 */
export function setProps(providerProps: Object) {
  this.setState({ providerProps })
}
