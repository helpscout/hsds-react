// @flow
import colors from '../configs/colors'
import { isNumber } from '../../utilities/is'

type Color = string
type ColorArgs = any

/**
 * Retrieves a color/shade from the Color palette
 * @param   {number | string} args The color arguments.
 * @returns {string} The fetched color HEX code.
 */
export const getColor = (...args: ColorArgs): Color => {
  const path = args.map(arg => (isNumber(arg) ? arg.toString() : arg))
  const defaultColor = colors.blue['500']

  // Defaults to Blue "500"
  if (path.length === 0) {
    return defaultColor
  }
  // Default to shade "500"
  if (path.length === 1) {
    path.push('500')
  }

  let index = 0
  let color = colors

  while (color != null && index < path.length) {
    color = color[path[index++]]
  }

  return color || defaultColor
}
