import { rgb } from '../../color'

describe('rgb', () => {
  test('Converts hex to rgb values', () => {
    expect(rgb('#fff')).toBe('rgb(255, 255, 255)')
    expect(rgb('#000')).toBe('rgb(0, 0, 0)')
    expect(rgb('#ff9900')).toBe('rgb(255, 153, 0)')
  })

  test('Defaults to black (rgb) if hex is invalid', () => {
    expect(rgb('purple')).toBe('rgb(0, 0, 0)')
  })
})
