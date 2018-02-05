const isHex = hex => (hex && typeof hex === 'string')
const isNumber = value => (typeof value === 'number')

// Source
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

export const componentToHex = (c) => {
  if (!c || typeof c !== 'number') return '00'
  const hex = c.toString(16)
  /* istanbul ignore next */
  return hex.length === 1 ? `0${hex}` : hex
}

export const hexToRgb = hex => {
  if (!isHex(hex)) return null
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  /* istanbul ignore next */
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export const rgbToHex = (r, g, b) => {
  if (!isNumber(r) || !isNumber(g) || !isNumber(b)) return null
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

// Source
// https://24ways.org/2010/calculating-color-contrast/
// https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area
export const optimalTextColor = (backgroundHex) => {
  if (!isHex(backgroundHex)) return null
  const backgroundRgb = hexToRgb(backgroundHex)
  const shade = Math.round(
    (
      (backgroundRgb.r * 179) + // Default: 299
      (backgroundRgb.g * 557) + // Default: 587
      (backgroundRgb.b * 74)    // Default: 114
    ) / 1000
  )

  return (shade >= 128) ? 'black' : 'white'
}

// Source
// https://css-tricks.com/snippets/javascript/lighten-darken-color/
export const lightenDarkenColor = (color, value) => {
  /* istanbul ignore else */
  if (color[0] === '#') {
    color = color.slice(1)
  }

  /* istanbul ignore next */
  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2]
  }

  const num = parseInt(color, 16)

  let r = (num >> 16) + value
  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00FF) + value
  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000FF) + value
  if (g > 255) g = 255
  else if (g < 0) g = 0

  return '#' + ('000000' + (g | (b << 8) | (r << 16)).toString(16)).slice(-6)
}

export const lighten = (hex, value = 20) => {
  if (!isHex(hex) || typeof value !== 'number') return null
  return lightenDarkenColor(hex, value * 2.55)
}

export const darken = (hex, value = 20) => {
  if (!isHex(hex) || typeof value !== 'number') return null
  return lightenDarkenColor(hex, ((value * 2.55) * -1))
}
