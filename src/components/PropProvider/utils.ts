import { AppNamespace, PropProviderProps, ConfigGetter } from './types'
import { isArray, isObject, isPlainObject, isString } from '../../utilities/is'

/**
 * Namespaces
 */
export const APPS = {
  beacon: 'beacon',
  hsApp: 'hs-app',
}

export const propProviderAppNamespace: string =
  '__BLUE_SECRET_PROP_PROVIDER_GLOBAL_APP__'
export const propProviderAppNamespaceValue: string = 'blue'

// HTML friendly key for PropProviderAppProp
// 🖋 🍍 🍎 🖋
// https://www.youtube.com/watch?v=0E00Zuayv9Q
export const propProviderDataAttr: string = 'data-blue-ppap'

/**
 * Default Config
 */
export const contextConfig: PropProviderProps = {
  // Default app "environment" is Blue - "Da ba dee, da ba die"
  [propProviderAppNamespace]: propProviderAppNamespaceValue,
}

/**
 * Sets the internal global app namespace for Blue components.
 * @param {Object} config The initial PropProvider config.
 * @param {string} namespace The namespace for the App.
 * @returns {Object} The modified PropProvider config.
 */
export function setGlobalApp(
  config: PropProviderProps,
  namespace: AppNamespace
): PropProviderProps {
  const baseConfig = !isPlainObject(config) ? contextConfig : config
  const appNamespace = isString(namespace)
    ? namespace
    : propProviderAppNamespaceValue

  return {
    ...baseConfig,
    [propProviderAppNamespace]: appNamespace,
  }
}

/**
 * Retrieves the internal global config for Blue components.
 * @param {Object} config The initial PropProvider config.
 * @returns {Object} The PropProvider global config
 */
export function getGlobal(config: PropProviderProps): Object {
  const baseConfig = isPlainObject(config) ? config : contextConfig

  if (!baseConfig.hasOwnProperty(propProviderAppNamespace)) {
    baseConfig[propProviderAppNamespace] = propProviderAppNamespaceValue
  }

  return baseConfig
}

/**
 * Retrieves the internal global app namespace for Blue components.
 * @param {Object} config The initial PropProvider config.
 * @returns {string} The namespace for the App.
 */
export function getGlobalApp(config: PropProviderProps): AppNamespace {
  const globalConfig = getGlobal(config)

  return globalConfig[propProviderAppNamespace]
}

export function getGlobalAppFromProps(props: Object): AppNamespace {
  return props[propProviderDataAttr]
}

export function isBeacon(props: Object): boolean {
  return getGlobalAppFromProps(props) === APPS.beacon
}

export function isHSApp(props: Object): boolean {
  return (
    getGlobalAppFromProps(props) === APPS.hsApp ||
    // @ts-ignore
    (props.theme && getGlobalAppFromProps(props.theme) === APPS.hsApp)
  )
}

/**
 * Merge contextProps with parent contextProps.
 * @param   {Object} props The initial PropProvider configs.
 * @param   {Object} nextProps The next PropProvider configs.
 * @returns {Object} The merged props.
 */
export function shallowMergeProps(props: Object = {}, nextProps: Object = {}) {
  // Safety check
  const safeProps = isPlainObject(props) ? props : {}
  const safeNextProps = isPlainObject(nextProps) ? nextProps : {}

  const mergedProps = { ...safeProps }

  Object.keys(safeNextProps).forEach(key => {
    const prop = mergedProps[key]
    const nextProp = safeNextProps[key]

    if (prop) {
      if (isPlainObject(nextProp)) {
        mergedProps[key] = {
          ...prop,
          ...nextProp,
        }
      } else {
        mergedProps[key] = nextProp
      }
    } else {
      mergedProps[key] = nextProp
    }
  })

  return mergedProps
}

/**
 * Attempts to retrieve the specified config props.
 *
 * @param   {Object} config The PropProvider configs.
 * @param   {Array<string> | Function | Object | string} getter The namespace of the config.
 * @returns {Object} The retrieved config props.
 */
export function getConfigProps(
  config: Object,
  getter: ConfigGetter = ''
): Object {
  if (!config) return contextConfig

  let props = {}

  if (typeof getter === 'string') {
    props = config.hasOwnProperty(getter) ? config[getter] : {}
  }
  if (typeof getter === 'function') {
    props = getter(config)
  }
  if (Array.isArray(getter)) {
    props = getConfigPropsFromArray(config, getter)
  }

  if (isObject(getter)) {
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
