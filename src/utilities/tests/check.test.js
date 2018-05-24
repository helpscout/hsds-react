import { isDefined, anyDefined, allDefined } from '../check'

describe('isDefined', () => {
  test('Returns true for defined', () => {
    expect(isDefined(1)).toBe(true)
    expect(isDefined('a')).toBe(true)
    expect(isDefined([])).toBe(true)
    expect(isDefined(false)).toBe(true)
    expect(isDefined(0)).toBe(true)
  })

  test('Returns false for undefined', () => {
    expect(isDefined()).toBe(false)
    expect(isDefined(undefined)).toBe(false)
    expect(isDefined(null)).toBe(false)
  })
})

describe('anyDefined', () => {
  test('Returns true if defined', () => {
    expect(anyDefined([1, 2, 3])).toBe(true)
    expect(anyDefined([1, false, 3])).toBe(true)
    expect(anyDefined([1, false, false])).toBe(true)
    expect(anyDefined([1, undefined, false])).toBe(true)
    expect(anyDefined([1, undefined, null])).toBe(true)
    expect(anyDefined([undefined, undefined, 3])).toBe(true)
    expect(anyDefined({ a: undefined, b: undefined, c: 3 })).toBe(true)
  })

  test('Returns false if undefined', () => {
    expect(anyDefined()).toBe(false)
    expect(anyDefined([null, null])).toBe(false)
    expect(anyDefined([undefined, undefined])).toBe(false)
    expect(anyDefined({ a: undefined, b: undefined })).toBe(false)
  })
})

describe('allDefined', () => {
  test('Returns true if defined', () => {
    expect(allDefined([1, 2, 3])).toBe(true)
    expect(allDefined({ a: 1, b: 2, c: 3 })).toBe(true)
  })

  test('Returns false if undefined', () => {
    expect(allDefined()).toBe(false)
    expect(allDefined([1, null, 3])).toBe(false)
    expect(allDefined([1, false, null])).toBe(false)
    expect(allDefined([1, undefined, false])).toBe(false)
    expect(allDefined([1, undefined, null])).toBe(false)
    expect(allDefined([undefined, undefined, 3])).toBe(false)
    expect(allDefined([null, null])).toBe(false)
    expect(allDefined([undefined, undefined])).toBe(false)
  })
})
