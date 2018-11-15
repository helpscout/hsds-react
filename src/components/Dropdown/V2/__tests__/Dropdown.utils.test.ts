import {
  pathResolve,
  isPathActive,
  getParentPath,
  getNextChildPath,
  incrementPathIndex,
  decrementPathIndex,
} from '../Dropdown.utils'

describe('pathResolve', () => {
  test('Combines paths together, with a . delimeter', () => {
    expect(pathResolve('a', 'b')).toBe('a.b')
    expect(pathResolve('a', 'b', 'c', 'd')).toBe('a.b.c.d')
  })

  test('Filters out undefined paths', () => {
    expect(pathResolve('a', 'b', undefined, 'd')).toBe('a.b.d')
    expect(pathResolve('a', 'b', null, 'd')).toBe('a.b.d')
  })

  test('Ignores initial path if undefined', () => {
    expect(pathResolve(null, 'b')).toBe('b')
    expect(pathResolve(undefined, 'b')).toBe('b')
  })

  test('Does not ignore zero as initial path', () => {
    expect(pathResolve(0, 'b')).toBe('0.b')
  })

  test('Converts numbers to strings', () => {
    expect(pathResolve(0, 1, 2, 3, 4)).toBe('0.1.2.3.4')
    expect(pathResolve(0, 1, 2, 0, 4)).toBe('0.1.2.0.4')
    expect(pathResolve(0, 1, 2, null, 4)).toBe('0.1.2.4')
  })
})

describe('isPathActive', () => {
  test('Returns true for matching path', () => {
    expect(isPathActive('1.2.3.4', '1')).toBe(true)
    expect(isPathActive('1.2.3', '1')).toBe(true)
    expect(isPathActive('1.2.3', '1.2')).toBe(true)
    expect(isPathActive('1.2.3', '1.2.3')).toBe(true)
    expect(isPathActive('1.2.3.4', '1.2.3')).toBe(true)
  })

  test('Returns false for non-matching paths', () => {
    expect(isPathActive('1.2', '1.2.3')).toBe(false)
    expect(isPathActive('0', '1')).toBe(false)
    expect(isPathActive('0.1', '1')).toBe(false)
    expect(isPathActive('0.1.1', '1.1')).toBe(false)
    expect(isPathActive('1.1.1', '1.2')).toBe(false)
    expect(isPathActive('1.1.1', '1.2.1')).toBe(false)
    expect(isPathActive('1.1.1', '1.1.0')).toBe(false)
  })
})

describe('getParentPath', () => {
  test('Returns the parent path', () => {
    expect(getParentPath('1.2.3.4')).toBe('1.2.3')
    expect(getParentPath('1.2.3')).toBe('1.2')
    expect(getParentPath('1.2')).toBe('1')
    expect(getParentPath('1')).toBe('1')
  })
})

describe('getNextChildPath', () => {
  test('Returns the first child index + current path', () => {
    expect(getNextChildPath('1')).toBe('1.0')
    expect(getNextChildPath('1.1')).toBe('1.1.0')
    expect(getNextChildPath('1.0')).toBe('1.0.0')
    expect(getNextChildPath('0')).toBe('0.0')
  })
})

describe('incrementPathIndex', () => {
  test('Increases path index by 1, by default', () => {
    expect(incrementPathIndex('0')).toBe('1')
    expect(incrementPathIndex('1')).toBe('2')
    expect(incrementPathIndex('0.0')).toBe('0.1')
    expect(incrementPathIndex('0.1.0.1')).toBe('0.1.0.2')
  })

  test('Can increment path by a specified value', () => {
    expect(incrementPathIndex('0', 5)).toBe('5')
    expect(incrementPathIndex('1', 10)).toBe('11')
    expect(incrementPathIndex('0.0', 3)).toBe('0.3')
    expect(incrementPathIndex('0.1.0.1', 18)).toBe('0.1.0.19')
  })
})

describe('decrementPathIndex', () => {
  test('Increases path index by 1, by default', () => {
    expect(decrementPathIndex('1')).toBe('0')
    expect(decrementPathIndex('2')).toBe('1')
    expect(decrementPathIndex('0.1')).toBe('0.0')
    expect(decrementPathIndex('0.1.0.1')).toBe('0.1.0.0')
  })

  test('Can increment path by a specified value', () => {
    expect(decrementPathIndex('6', 5)).toBe('1')
    expect(decrementPathIndex('20', 10)).toBe('10')
    expect(decrementPathIndex('0.5', 3)).toBe('0.2')
  })

  test('Does not decrement below zero', () => {
    expect(decrementPathIndex('0')).toBe('0')
    expect(decrementPathIndex('5.4.3.0')).toBe('5.4.3.0')
    expect(decrementPathIndex('5.4.3.0', 10)).toBe('5.4.3.0')
  })
})
