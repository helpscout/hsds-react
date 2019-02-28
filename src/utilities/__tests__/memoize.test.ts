import { shallowPropMemoizeIsEqual } from '../memoize'

describe('shallowPropMemoizeIsEqual', () => {
  test('Returns true for equal values', () => {
    const a = {
      one: 1,
    }

    const b = {
      one: 1,
    }

    expect(shallowPropMemoizeIsEqual([a], [b])).toBe(true)
  })

  test('Returns true for multiple equal values', () => {
    const a = {
      one: 1,
      two: 'two',
      three: true,
    }

    const b = {
      one: 1,
      two: 'two',
      three: true,
    }

    expect(shallowPropMemoizeIsEqual([a], [b])).toBe(true)
  })

  test('Returns false for non-matching values', () => {
    const a = {
      one: [],
    }

    const b = {
      one: [],
    }

    // Returns false because the Array instance is different
    expect(shallowPropMemoizeIsEqual([a], [b])).toBe(false)
  })
})
