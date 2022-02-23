import isNumber from 'lodash.isnumber'
import { GLOBAL_FONT_SIZE_NAMESPACE } from './variableFontSize'
import { FONT_FAMILY } from '../configs/constants'

export const setFontSize = size => {
  const computedSize = isNumber(size) ? `${size}px` : size

  return `${GLOBAL_FONT_SIZE_NAMESPACE}: ${computedSize}`
}

export const makeFontFamilyFactory = (fonts, baseFont = FONT_FAMILY) => () => {
  if (!fonts) {
    return `font-family: ${baseFont};`
  } else {
    return `
      font-family: ${fonts}, ${baseFont};
    `
  }
}

export const makeFontFamily = fonts => {
  return makeFontFamilyFactory(fonts, FONT_FAMILY)
}
