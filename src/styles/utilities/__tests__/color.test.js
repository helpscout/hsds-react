import colors from '../../configs/colors'
import { getColor } from '../color'

test('Returns Blue 500 as a default', () => {
  expect(getColor()).toEqual(colors.blue['500'])
})

test('Can retrieve color values (number)', () => {
  expect(getColor('red', 300)).toEqual(colors.red['300'])
  expect(getColor('yellow', 800)).toEqual(colors.yellow['800'])
  expect(getColor('purple', 400)).toEqual(colors.purple['400'])
  expect(getColor('charcoal', 200)).toEqual(colors.charcoal['200'])
})

test('Can retrieve color values (string)', () => {
  expect(getColor('red', '300')).toEqual(colors.red['300'])
  expect(getColor('yellow', '800')).toEqual(colors.yellow['800'])
  expect(getColor('purple', '400')).toEqual(colors.purple['400'])
  expect(getColor('charcoal', '200')).toEqual(colors.charcoal['200'])
})

test('Renders default shade of 500', () => {
  expect(getColor('red')).toEqual(colors.red['500'])
  expect(getColor('yellow')).toEqual(colors.yellow['500'])
  expect(getColor('purple')).toEqual(colors.purple['500'])
  expect(getColor('charcoal')).toEqual(colors.charcoal['500'])
})

test('Returns Blue 500 if colors are invalid', () => {
  expect(getColor('nope', 1000)).toEqual(colors.blue['500'])
  expect(getColor('wut')).toEqual(colors.blue['500'])
  expect(getColor('blue', 99999)).toEqual(colors.blue['500'])
})

test('Returns nested color', () => {
  expect(getColor('state', 'danger', 'color')).toEqual(
    colors.state.danger.color
  )
  expect(getColor('state', 'success', 'color')).toEqual(
    colors.state.success.color
  )
})

test('Can parse dot notation', () => {
  expect(getColor('blue.500')).toEqual(colors.blue['500'])
  expect(getColor('red.200')).toEqual(colors.red['200'])
  expect(getColor('state.danger.color')).toEqual(colors.state.danger.color)
  expect(getColor('state.success.color')).toEqual(colors.state.success.color)
})
