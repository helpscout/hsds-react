import isNil from 'lodash.isnil'
import { defaultBrandColor, makeBrandColors } from '../color'

const brandColorProps = [
  'backgroundColorActive',
  'backgroundColorHover',
  'backgroundColorInteractive',
  'backgroundColorUI',
  'backgroundColorUIActive',
  'backgroundColorUIFocus',
  'backgroundColorUIHover',
  'backgroundColorUIMuted',
  'brandColor',
  'colorShade',
  'isWhite',
  'svgPathPrimary',
  'svgPathSecondary',
  'textColor',
  'textColorInactive',
  'textColorInteractive',
  'textColorMuted',
]

const hasAllBrandColorProps = brandColors => {
  const keyCount = Object.keys(brandColors).reduce((count, key) => {
    if (brandColorProps.indexOf(key) >= 0 && !isNil(brandColors[key])) {
      return count + 1
    } else {
      return count
    }
  }, 0)

  return keyCount === brandColorProps.length
}

describe('Defaults', () => {
  test('Creates colors with default brand color', () => {
    const brandColors = makeBrandColors()

    expect(brandColors.brandColor).toBe(defaultBrandColor)
    expect(hasAllBrandColorProps(brandColors)).toBeTruthy()
  })

  test('Creates colors with default brand color', () => {
    const brandColors = makeBrandColors()

    expect(brandColors.brandColor).toBe(defaultBrandColor)
    expect(hasAllBrandColorProps(brandColors)).toBeTruthy()
  })
})

describe('Shades', () => {
  test('Can detect/generate lightest shade', () => {
    const brandColors = makeBrandColors('#ffd8e0')

    expect(brandColors.colorShade).toBe('lightest')
    expect(brandColors.textColor).not.toBe('white')
    expect(hasAllBrandColorProps(brandColors)).toBeTruthy()
  })

  test('Can detect/generate lightest shade', () => {
    const brandColors = makeBrandColors('#c4d8e0')

    expect(brandColors.colorShade).toBe('light')
    expect(brandColors.textColor).not.toBe('white')
    expect(hasAllBrandColorProps(brandColors)).toBeTruthy()
  })

  test('Can detect/generate dark shade', () => {
    const brandColors = makeBrandColors('#45494f')

    expect(brandColors.colorShade).toBe('dark')
    expect(brandColors.textColor).toBe('white')
    expect(hasAllBrandColorProps(brandColors)).toBeTruthy()
  })

  test('Can detect/generate darkest shade', () => {
    const brandColors = makeBrandColors('#041d10')

    expect(brandColors.colorShade).toBe('darkest')
    expect(brandColors.textColor).toBe('white')
    expect(hasAllBrandColorProps(brandColors)).toBeTruthy()
  })
})

describe('White', () => {
  test('Can detect white', () => {
    expect(makeBrandColors('#fff').isWhite).toBe(true)
    expect(makeBrandColors('#ffffff').isWhite).toBe(true)
    expect(makeBrandColors('#fefefe').isWhite).toBe(false)
    expect(makeBrandColors('#fef').isWhite).toBe(false)
  })

  test('White renders all brandColor props', () => {
    const brandColors = makeBrandColors('#ffffff')

    expect(brandColors.textColor).not.toBe('white')
    expect(hasAllBrandColorProps(brandColors)).toBeTruthy()
  })
})
