import {
  hexToRgb,
  rgbToHex
} from '../../color'

test('Returns null, if invalid arguments', () => {
  expect(rgbToHex()).toEqual(null)
  expect(rgbToHex(true)).toEqual(null)
  expect(rgbToHex(111)).toEqual(null)
  expect(rgbToHex({r: 1, g: 123, b: '5'})).toEqual(null)
})

test('Returns hex with value arguments', () => {
  const hex = '#ff0000'
  const rgb = hexToRgb(hex)
  expect(rgbToHex(rgb.r, rgb.g, rgb.b)).toEqual(hex)
})
