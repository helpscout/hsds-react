import { rgbToHsl } from '../../color'

test('Returns null for invalid arguments', () => {
  expect(rgbToHsl()).toEqual(null)
  expect(rgbToHsl(true)).toEqual(null)
  expect(rgbToHsl(111)).toEqual(null)
  expect(rgbToHsl({ r: 1, g: 123, b: '5' })).toEqual(null)
})

test('Correctly converts white to HSL values', () => {
  const hsl = rgbToHsl(255, 255, 255)
  expect(hsl.h).toBe(0)
  expect(hsl.s).toBe(0)
  expect(hsl.l).toBe(1)
})

test('Correctly converts dark to HSL values', () => {
  const hsl = rgbToHsl(0, 0, 0)
  expect(hsl.h).toBe(0)
  expect(hsl.s).toBe(0)
  expect(hsl.l).toBe(0)
})

test('Correctly converts darkish to HSL values', () => {
  const hsl = rgbToHsl(0, 0, 0)
  expect(hsl.h).toBe(0)
  expect(hsl.s).toBe(0)
  expect(hsl.l).toBe(0)
})

test('Correctly converts rgb values to HSL', () => {
  // Based on:
  // https://www.rapidtables.com/convert/color/rgb-to-hsl.html

  // Lime
  expect(rgbToHsl(0, 255, 0)).toEqual({
    h: 0.33,
    s: 1,
    l: 0.5,
  })

  // Silver
  expect(rgbToHsl(192, 192, 192)).toEqual({
    h: 0,
    s: 0,
    l: 0.75,
  })

  // Teal
  expect(rgbToHsl(0, 128, 128)).toEqual({
    h: 0.5,
    s: 1,
    l: 0.25,
  })
})
