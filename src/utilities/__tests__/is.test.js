import {
  isArray,
  isBool,
  isFunction,
  isObject,
  isNumber,
  isString,
  isDefined,
  anyDefined,
  allDefined,
  allPropsDefined,
} from '../is'

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

describe('isNumber', () => {
  test('Returns false for non-numbers', () => {
    expect(isNumber()).toBe(false)
    expect(isNumber('0')).toBe(false)
    expect(isNumber('1')).toBe(false)
    expect(isNumber(() => {})).toBe(false)
    expect(isNumber([])).toBe(false)
    expect(isNumber(class TestFunction {})).toBe(false)
  })

  test('Returns true for numbers', () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(1)).toBe(true)
    expect(isNumber(100)).toBe(true)
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

describe('isDefined', () => {
  test('Returns false for undefined', () => {
    expect(isDefined()).toBe(false)
    expect(isDefined(undefined)).toBe(false)
  })

  test('Returns true for defined', () => {
    expect(isDefined(null)).toBe(true)
    expect(isDefined(0)).toBe(true)
    expect(isDefined(true)).toBe(true)
  })
})

describe('anyDefined', () => {
  test('Returns false for undefined', () => {
    const props = [undefined, undefined]
    expect(anyDefined()).toBe(false)
    expect(anyDefined(undefined)).toBe(false)
    expect(anyDefined(undefined, undefined)).toBe(false)
    expect(anyDefined(...props)).toBe(false)
  })

  test('Returns true for defined', () => {
    const props = [1, undefined, undefined]
    expect(anyDefined(0)).toBe(true)
    expect(anyDefined(undefined, 1)).toBe(true)
    expect(anyDefined(...props)).toBe(true)
  })
})

describe('allDefined', () => {
  test('Returns false for undefined', () => {
    const props = [undefined, undefined]
    expect(allDefined()).toBe(false)
    expect(allDefined(undefined)).toBe(false)
    expect(allDefined(undefined, undefined)).toBe(false)
    expect(allDefined(...props)).toBe(false)
    expect(allDefined(undefined, 1)).toBe(false)
  })

  test('Returns true for defined', () => {
    expect(allDefined(0)).toBe(true)
    expect(allDefined(0, 1)).toBe(true)
    expect(allDefined('a', [], 0, 2)).toBe(true)
  })
})

describe('allPropsDefined', () => {
  test('Returns false for undefined', () => {
    const props = { a: undefined, b: undefined }
    expect(allPropsDefined(props)).toBe(false)
    expect(allPropsDefined()).toBe(false)
  })

  test('Returns true for defined', () => {
    const props = { a: 1, b: 2 }
    expect(allPropsDefined(props)).toBe(true)
  })
})
