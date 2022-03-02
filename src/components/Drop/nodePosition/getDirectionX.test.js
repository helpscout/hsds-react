import { getDirectionX } from '../Drop.utils'

test('Returns false for invalid arguments', () => {
  expect(getDirectionX()).toBe('')
  expect(getDirectionX(10)).toBe('')
  expect(getDirectionX(true)).toBe('')
})

test('Returns blank if no matches', () => {
  expect(getDirectionX('nopeeeeeee')).toBe('')
})

test('Returns left if matches', () => {
  expect(getDirectionX('left')).toBe('left')
  expect(getDirectionX('up left')).toBe('left')
  expect(getDirectionX('down left')).toBe('left')
  expect(getDirectionX('left down')).toBe('left')
  expect(getDirectionX('left up')).toBe('left')
})

test('Returns right if matches', () => {
  expect(getDirectionX('right')).toBe('right')
  expect(getDirectionX('up right')).toBe('right')
  expect(getDirectionX('down right')).toBe('right')
  expect(getDirectionX('right down')).toBe('right')
  expect(getDirectionX('right up')).toBe('right')
})
