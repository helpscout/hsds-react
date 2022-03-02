import { getDirectionY } from '../Drop.utils'

test('Returns false for invalid arguments', () => {
  expect(getDirectionY()).toBe('down')
  expect(getDirectionY(10)).toBe('down')
  expect(getDirectionY(true)).toBe('down')
})

test('Returns blank if no matches', () => {
  expect(getDirectionY('nopeeeeeee')).toBe('')
})

test('Returns down if matches', () => {
  expect(getDirectionY('down')).toBe('down')
  expect(getDirectionY('left down')).toBe('down')
  expect(getDirectionY('right down')).toBe('down')
  expect(getDirectionY('down right')).toBe('down')
  expect(getDirectionY('down left')).toBe('down')
})

test('Returns up if matches', () => {
  expect(getDirectionY('up')).toBe('up')
  expect(getDirectionY('left up')).toBe('up')
  expect(getDirectionY('right up')).toBe('up')
  expect(getDirectionY('up right')).toBe('up')
  expect(getDirectionY('up left')).toBe('up')
})
