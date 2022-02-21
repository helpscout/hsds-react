import isNumber from 'lodash.isnumber'
import { GLOBAL_FONT_SIZE_NAMESPACE } from './variableFontSize'
import { FONT_FAMILY, FONT_FAMILY_MONO } from '../configs/constants'

export const setFontSize = size => {
  const computedSize = isNumber(size) ? `${size}px` : size

  return `${GLOBAL_FONT_SIZE_NAMESPACE}: ${computedSize}`
}

export const addFontSmoothing = () => {
  return `
    -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
  `
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

export const makeFontFamilyMono = fonts => {
  return makeFontFamilyFactory(fonts, FONT_FAMILY_MONO)
}

export const makeFontFamilySystem = () => {
  return `font-family: ${FONT_FAMILY};`
}
