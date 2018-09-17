// @flow
import colors from '../configs/colors'
import { isNumber, isObject } from '../../utilities/is'
import get from '../../utilities/get'

type Color = string
type ColorArgs = any

/**
 * Retrieves a color/shade from the Color palette
 * @param   {number | string} args The color arguments.
 * @returns {string} The fetched color HEX code.
 */
export const getColor = (...args: ColorArgs): Color => {
  let path = args.map(arg => (isNumber(arg) ? arg.toString() : arg))
  const defaultColor = 'currentColor'
  const firstArg = path[0]

  // Defaults to Blue "500"
  if (path.length === 0) {
    return defaultColor
  }
  // Dot notation
  if (firstArg.indexOf('.') >= 0) {
    path = firstArg.split('.')
  }
  // Default to shade "default"
  if (path.length === 1) {
    path.push('default')
  }

  let index = 0
  let color = colors

  while (color != null && index < path.length) {
    color = color[path[index++]]
  }

  if (isObject(color)) {
    color = color['default']
  }

  return color || defaultColor
}

/**
 * Retrieves a brand property from ThemeProvider.
 * @param   {Object} props The styled props.
 * @param   {string} path  The props path to retrieve
 * @param   {any} fallback The fallback prop.
 * @returns {any} The fetched property
 */
export const getThemeBrandProp = (
  props: Object = {},
  path: string = '',
  fallback: any
): any => {
  return get(props, `theme.brandColor.${path}`, fallback)
}
