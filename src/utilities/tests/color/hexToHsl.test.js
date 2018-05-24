import { hexToHsl } from '../../color'

test('Returns null, if invalid arguments', () => {
  expect(hexToHsl()).toBe(null)
  expect(hexToHsl(true)).toBe(null)
  expect(hexToHsl(111)).toBe(null)
})

test('Returns hsl object with valid hex', () => {
  // Based on:
  // https://www.rapidtables.com/convert/color/rgb-to-hsl.html
  expect(hexToHsl('#00ff00')).toEqual({
    h: 0.33,
    s: 1,
    l: 0.5,
  })

  // Silver
  expect(hexToHsl('#c0c0c0')).toEqual({
    h: 0,
    s: 0,
    l: 0.75,
  })

  // Teal
  expect(hexToHsl('#008080')).toEqual({
    h: 0.5,
    s: 1,
    l: 0.25,
  })
})
