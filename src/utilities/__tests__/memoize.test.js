import { shallowPropMemoizeIsEqual, memoizeWithProps } from '../memoize'

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

describe('memoizeWithProps', () => {
  test('Does not refire if props are the same', () => {
    const spy = jest.fn()
    const memoSpy = memoizeWithProps(spy)
    const props = { a: 1 }

    // One
    memoSpy(props)
    // Two
    memoSpy(props)
    // Three
    memoSpy(props)

    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('Refires function if props are different', () => {
    const spy = jest.fn()
    const memoSpy = memoizeWithProps(spy)
    const props = { a: 1 }

    // One
    memoSpy(props)
    // Two
    memoSpy(props)
    // Three
    memoSpy({ a: 2 })
    // Four
    memoSpy({ a: 2 })

    expect(spy).toHaveBeenCalledTimes(2)
  })
})
