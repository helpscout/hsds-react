import { hexToRgb } from '../../color'

test('Returns null, if invalid arguments', () => {
  expect(hexToRgb()).toBe(null)
  expect(hexToRgb(true)).toBe(null)
  expect(hexToRgb(111)).toBe(null)
})

test('Returns rgb object with valid hex', () => {
  // Standard 6 hex values
  expect(hexToRgb('#ff0000')).toEqual({
    r: 255,
    g: 0,
    b: 0,
  })

  // 3 hex values
  expect(hexToRgb('#fff')).toEqual({
    r: 255,
    g: 255,
    b: 255,
  })

  // Capitals
  expect(hexToRgb('#Ff0000')).toEqual({
    r: 255,
    g: 0,
    b: 0,
  })

  // Without #
  expect(hexToRgb('Ff0000')).toEqual({
    r: 255,
    g: 0,
    b: 0,
  })
})
