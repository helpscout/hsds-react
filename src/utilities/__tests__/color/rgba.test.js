import { rgba } from '../../color'

describe('rgba', () => {
  test('Converts hex to rgb values', () => {
    expect(rgba('#fff', 0.5)).toBe('rgba(255, 255, 255, 0.5)')
    expect(rgba('#000', 0.7)).toBe('rgba(0, 0, 0, 0.7)')
    expect(rgba('#ff9900', 0)).toBe('rgba(255, 153, 0, 0)')
  })

  test('Defaults to 1 opacity', () => {
    expect(rgba('#fff')).toBe('rgba(255, 255, 255, 1)')
  })

  test("Opacity can't drop below 0", () => {
    expect(rgba('#fff', -5)).toBe('rgba(255, 255, 255, 0)')
  })

  test("Opacity can't exceed 1", () => {
    expect(rgba('#fff', 5)).toBe('rgba(255, 255, 255, 1)')
  })

  test('Defaults to black (rgb) if hex is invalid', () => {
    expect(rgba('purple')).toBe('rgba(0, 0, 0, 1)')
  })
})
