// @flow
import colors from '../configs/colors'

type Color = string
type Shade = number | string
/**
 * Retrieves a color/shade from the Color palette
 */
export const getColor = (
  color: Color = 'blue',
  shade: Shade = '500'
): string => {
  const defaultColor = colors.blue['500']
  const shadeValue = typeof shade === 'number' ? shade.toString() : shade

  if (!colors[color]) return defaultColor
  if (!colors[color][shadeValue]) return defaultColor

  return colors[color][shadeValue]
}
