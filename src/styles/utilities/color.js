import get from 'lodash.get'
import colorScheme from '../configs/colors'
import { darken, getColorShade, lighten } from '../../utilities/color'
import { isNumber, isObject } from '../../utilities/is'
export { rgba } from '../../utilities/color'

/**
 * Retrieves a color/shade from the Color palette
 * @param   {number | string} args The color arguments.
 * @returns {string} The fetched color HEX code.
 */
export const getColor = (...args) => {
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
  let color = colorScheme

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
export const getThemeBrandProp = (props = {}, path = '', fallback = '') => {
  return get(props, `theme.brandColor.${path}`, fallback)
}

export const defaultBrandColor = getColor('blue.500')

/**
 * Generates a series of color variables based on a single HEX code used
 * for theming.
 *
 * @param {string} brandColor  The brand color
 * @returns {Object} The generated brandColor props
 */
export const makeBrandColors = (brandColor = defaultBrandColor) => {
  // Possible Values: Darkest, Dark, Light, Lightest
  const colorShade = getColorShade(brandColor)
  const isWhite =
    brandColor.toLowerCase() === '#fff' ||
    brandColor.toLowerCase() === '#ffffff'

  // Setup and adjust props based on theme color choice
  // These colors need to be adjusted based on the brandColor's shade.
  let backgroundColorInteractive
  let backgroundColorHover
  let backgroundColorActive
  let backgroundColorUI
  let backgroundColorUIMuted
  let backgroundColorUIHover
  let backgroundColorUIActive
  let backgroundColorUIFocus
  let svgPathPrimary
  let svgPathSecondary
  let textColor
  let textColorInteractive
  let textColorInactive
  let textColorMuted

  if (colorShade === 'lightest' || colorShade === 'light') {
    backgroundColorHover = darken(brandColor, 3)
    backgroundColorActive = darken(brandColor, 5)
    backgroundColorUI = brandColor
    backgroundColorUIMuted = darken(brandColor, 10)
    backgroundColorUIHover = darken(brandColor, 3)
    backgroundColorUIActive = darken(brandColor, 6)
    backgroundColorUIFocus = darken(brandColor, 10)
    svgPathPrimary = darken(brandColor, 30)
    svgPathSecondary = 'white'
  }

  if (colorShade === 'lightest') {
    backgroundColorInteractive = darken(brandColor, 5)
    textColor = darken(brandColor, 70)
    textColorInteractive = darken(brandColor, 70)
    textColorInactive = darken(brandColor, 35)
    textColorMuted = darken(brandColor, 10)

    if (isWhite) {
      textColor = '#394956'
      backgroundColorUIMuted = '#fff'
    }
  }

  if (colorShade === 'light') {
    backgroundColorInteractive = darken(brandColor, 8)
    textColor = darken(brandColor, 55)
    textColorInteractive = darken(brandColor, 55)
    textColorInactive = darken(brandColor, 35)
    textColorMuted = darken(brandColor, 10)
  }

  if (colorShade === 'dark' || colorShade === 'darkest') {
    backgroundColorHover = lighten(brandColor, 3)
    backgroundColorActive = lighten(brandColor, 5)
    backgroundColorUI = brandColor
    textColor = 'white'
    textColorInteractive = 'white'
    textColorInactive = lighten(brandColor, 35)
    textColorMuted = lighten(brandColor, 10)
  }

  if (colorShade === 'dark') {
    backgroundColorInteractive = darken(brandColor, 8)
    backgroundColorUIHover = darken(brandColor, 3)
    backgroundColorUIActive = darken(brandColor, 6)
    backgroundColorUIFocus = darken(brandColor, 10)
    backgroundColorUIMuted = darken(brandColor, 6)
    svgPathPrimary = darken(brandColor, 30)
    svgPathSecondary = 'white'
  }

  if (colorShade === 'darkest') {
    backgroundColorInteractive = lighten(brandColor, 16)
    backgroundColorUIHover = lighten(brandColor, 3)
    backgroundColorUIActive = lighten(brandColor, 6)
    backgroundColorUIFocus = lighten(brandColor, 10)
    backgroundColorUIMuted = lighten(brandColor, 10)
    svgPathPrimary = lighten(brandColor, 60)
    svgPathSecondary = lighten(brandColor, 40)
  }

  // Setup props for style generators
  return {
    backgroundColorActive,
    backgroundColorHover,
    backgroundColorInteractive,
    backgroundColorUI,
    backgroundColorUIActive,
    backgroundColorUIFocus,
    backgroundColorUIHover,
    backgroundColorUIMuted,
    brandColor,
    colorShade,
    isWhite,
    svgPathPrimary,
    svgPathSecondary,
    textColor,
    textColorInactive,
    textColorInteractive,
    textColorMuted,
  }
}
