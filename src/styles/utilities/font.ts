import { GLOBAL_FONT_SIZE_NAMESPACE } from './variableFontSize'
import { FONT_FAMILY, FONT_FAMILY_MONO } from '../configs/constants'
import { isNumber } from '../../utilities/is'

export const setFontSize = (size: number | string): string => {
  const computedSize = isNumber(size) ? `${size}px` : size

  return `${GLOBAL_FONT_SIZE_NAMESPACE}: ${computedSize}`
}

export const addFontSmoothing = (): string => {
  return `
    -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
  `
}

export const makeFontFamilyFactory = (
  fonts,
  baseFont = FONT_FAMILY
) => (): string => {
  if (!fonts) {
    return `font-family: ${baseFont};`
  } else {
    return `
      font-family: ${fonts}, ${baseFont};
    `
  }
}

export const makeFontFamily = (fonts: string) => {
  return makeFontFamilyFactory(fonts, FONT_FAMILY)
}

export const makeFontFamilyMono = (fonts: string) => {
  return makeFontFamilyFactory(fonts, FONT_FAMILY_MONO)
}
