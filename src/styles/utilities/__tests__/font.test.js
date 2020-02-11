import { GLOBAL_FONT_SIZE_NAMESPACE } from '../variableFontSize'
import {
  addFontSmoothing,
  setFontSize,
  makeFontFamilyFactory,
  makeFontFamily,
  makeFontFamilyMono,
  makeFontFamilySystem,
} from '../font'
import { FONT_FAMILY, FONT_FAMILY_MONO } from '../../configs/constants'

describe('addFontSmoothing', () => {
  test('Generates font-smoothing styles', () => {
    expect(addFontSmoothing()).toContain('font-smoothing')
  })
})

describe('setFontSize', () => {
  test('Renders with the global font CSS variable', () => {
    expect(setFontSize(10)).toContain(GLOBAL_FONT_SIZE_NAMESPACE)
  })

  test('Automatically converts number values to px', () => {
    expect(setFontSize(0)).toContain('0px')
    expect(setFontSize(10)).toContain('10px')
    expect(setFontSize(999)).toContain('999px')
  })

  test('Can render standard CSS values (px, em, %, etc...)', () => {
    expect(setFontSize('12px')).toContain('12px')
    expect(setFontSize('12em')).toContain('12em')
    expect(setFontSize('12%')).toContain('12%')
    expect(setFontSize('12pt')).toContain('12pt')
  })
})

describe('makeFontFamilyFactory', () => {
  test('Defaults to base font', () => {
    const fontFamily = makeFontFamilyFactory()()
    expect(fontFamily).toContain(FONT_FAMILY)
  })
})

describe('makeFontFamily', () => {
  test('Can extend font', () => {
    const fontFamily = makeFontFamily('Barlow')()
    expect(fontFamily).toContain(FONT_FAMILY)
    expect(fontFamily).toContain('Barlow')
  })
})

describe('makeFontFamilyMono', () => {
  test('Can extend font', () => {
    const fontFamily = makeFontFamilyMono('Roboto Mono')()
    expect(fontFamily).toContain(FONT_FAMILY_MONO)
    expect(fontFamily).toContain('Roboto Mono')
  })
})

describe('makeFontFamilySystem', () => {
  test('Sets system font family', () => {
    const fontFamily = makeFontFamilySystem()
    expect(fontFamily).toContain(FONT_FAMILY)
  })

  test('Does not use CSS var()', () => {
    const fontFamily = makeFontFamilySystem()
    expect(fontFamily).not.toContain('var')
  })
})
