import { isArray, isBool, isFunction, isObject, isString } from '../is'

describe('isArray', () => {
  test('Returns false for non-arrays', () => {
    expect(isArray()).toBe(false)
    expect(isArray(0)).toBe(false)
    expect(isArray(1)).toBe(false)
    expect(isArray({})).toBe(false)
  })

  test('Returns true for arrays', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
  })
})

describe('isBool', () => {
  test('Returns false for non-booleans', () => {
    expect(isBool()).toBe(false)
    expect(isBool(0)).toBe(false)
    expect(isBool(1)).toBe(false)
    expect(isBool({})).toBe(false)
  })

  test('Returns true for booleans', () => {
    expect(isBool(true)).toBe(true)
    expect(isBool(false)).toBe(true)
  })
})

describe('isFunction', () => {
  test('Returns false for non-functions', () => {
    expect(isFunction()).toBe(false)
    expect(isFunction(0)).toBe(false)
    expect(isFunction(1)).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction([])).toBe(false)
  })

  test('Returns true for functions', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(class TestFunction {})).toBe(true)
  })
})

describe('isObject', () => {
  test('Returns false for non-objects', () => {
    expect(isObject()).toBe(false)
    expect(isObject(0)).toBe(false)
    expect(isObject(1)).toBe(false)
    expect(isObject(() => {})).toBe(false)
    expect(isObject([])).toBe(false)
    expect(isObject(class TestFunction {})).toBe(false)
  })

  test('Returns true for objects', () => {
    expect(isObject({})).toBe(true)
  })
})

describe('isString', () => {
  test('Returns false for non-strings', () => {
    expect(isString()).toBe(false)
    expect(isString(0)).toBe(false)
    expect(isString(1)).toBe(false)
    expect(isString([])).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(/g/g)).toBe(false)
  })

  test('Returns true for strings', () => {
    expect(isString('')).toBe(true)
    expect(isString('word')).toBe(true)
    expect(isString('   word')).toBe(true)
    expect(isString('   word word2 ')).toBe(true)
  })
})
