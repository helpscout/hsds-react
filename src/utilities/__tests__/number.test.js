import { isEven, isOdd, getMiddleIndex } from '../number'

describe('isEven', () => {
  test('Should detect even numbers', () => {
    expect(isEven(0)).toBe(true)
    expect(isEven(2)).toBe(true)
    expect(isEven(200)).toBe(true)
    expect(isEven(48)).toBe(true)
    expect(isEven(9418456)).toBe(true)

    expect(isEven(1)).toBe(false)
    expect(isEven(3)).toBe(false)
    expect(isEven(319)).toBe(false)
  })
})

describe('isOdd', () => {
  test('Should detect even numbers', () => {
    expect(isOdd(1)).toBe(true)
    expect(isOdd(3)).toBe(true)
    expect(isOdd(319)).toBe(true)
    expect(isOdd(12485167)).toBe(true)

    expect(isOdd(0)).toBe(false)
    expect(isOdd(2)).toBe(false)
    expect(isOdd(200)).toBe(false)
    expect(isOdd(48)).toBe(false)
    expect(isOdd(9418456)).toBe(false)
  })
})

describe('getMiddleIndex', () => {
  test('Should retrieve the middle index from number', () => {
    expect(getMiddleIndex(4)).toBe(1)
    expect(getMiddleIndex(5)).toBe(2)
    expect(getMiddleIndex(3)).toBe(1)
    expect(getMiddleIndex(9)).toBe(4)
    expect(getMiddleIndex(99)).toBe(49)
    expect(getMiddleIndex(100)).toBe(49)
  })
})
