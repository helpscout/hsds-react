import {
  darken
} from '../../color'

test('Returns null, if invalid arguments', () => {
  expect(darken()).toEqual(null)
  expect(darken(true)).toEqual(null)
  expect(darken(111)).toEqual(null)
})

test('Returns darken value of hex', () => {
  const oldValue = '#013013'
  const newValue = darken(oldValue, 20)

  expect(newValue).not.toEqual(oldValue)
  expect(darken(oldValue, 0)).toEqual(oldValue)
})

test('Does not darken beyond #000000', () => {
  expect(darken('#000000', 20)).toEqual('#000000')
  expect(darken('#000000', 0)).toEqual('#000000')
  expect(darken('#121212', 100)).toEqual('#000000')
})
