import { getDirections } from '../Drop.utils'

test('Returns default object for invalid argument', () => {
  const defaultOutput = {
    x: '',
    y: 'down',
  }
  expect(getDirections()).toEqual(defaultOutput)
  expect(getDirections(10)).toEqual(defaultOutput)
  expect(getDirections(true)).toEqual(defaultOutput)
})

test('Returns object with specified coordinates', () => {
  expect(getDirections('up left')).toEqual({ x: 'left', y: 'up' })
  expect(getDirections('down right')).toEqual({ x: 'right', y: 'down' })
  expect(getDirections('down right news teaaaaaaam')).toEqual({
    x: 'right',
    y: 'down',
  })
})
