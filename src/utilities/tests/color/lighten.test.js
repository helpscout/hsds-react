import {
  lighten
} from '../../color'

test('Returns null, if invalid arguments', () => {
  expect(lighten()).toEqual(null)
  expect(lighten(true)).toEqual(null)
  expect(lighten(111)).toEqual(null)
})

test('Returns lightened value of hex', () => {
  const oldValue = '#013013'
  const newValue = lighten(oldValue, 20)

  expect(newValue).not.toEqual(oldValue)
  expect(lighten(oldValue, 0)).toEqual(oldValue)
})

test('Does not lighten beyond #ffffff', () => {
  expect(lighten('#ffffff', 20)).toEqual('#ffffff')
  expect(lighten('#ffffff', 0)).toEqual('#ffffff')
  expect(lighten('#eeeeee', 100)).toEqual('#ffffff')
})
