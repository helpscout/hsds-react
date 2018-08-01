// @flow

// Fallback config namespace
export const NOOP = '__NOOP_CONFIG__'

// Collection of supported components
const COMPONENTS = ['Tooltip', NOOP]

/**
 * Generates the config.
 *
 * @returns {Object} The context config.
 */
export function makeContextConfig(): Object {
  return COMPONENTS.reduce((config, component) => {
    config[component] = {}

    return config
  }, {})
}

export const contextConfig = makeContextConfig()
