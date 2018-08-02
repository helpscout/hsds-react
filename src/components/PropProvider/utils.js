// @flow

// Default configs
export const contextConfig = {}

/**
 * Attempts to retrieve the specified config props.
 *
 * @param  {Object} config The PropProvider configs.
 * @param  {string} name The namespace of the config.
 * @return {Object} The retrieved config props.
 */
export function getConfigProps(
  config: Object = contextConfig,
  name: string = ''
): Object {
  const props = config.hasOwnProperty(name) ? config[name] : {}

  return props
}
