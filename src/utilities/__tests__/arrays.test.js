import { first, last, random, find } from '../arrays'

describe('first', () => {
  test('Returns undefined if empty', () => {
    expect(first()).toBeFalsy()
  })

  test('Returns first item', () => {
    expect(first([1, 2, 3])).toBe(1)
  })
})

describe('last', () => {
  test('Returns undefined if empty', () => {
    expect(last()).toBeFalsy()
  })

  test('Returns first item', () => {
    expect(last([1, 2, 3])).toBe(3)
  })
})

describe('Random', () => {
  test('Returns undefined if empty', () => {
    expect(random()).toBeFalsy()
  })

  test('Returns a random item', () => {
    const array = [1, 2, 3]
    expect(array).toContain(random(array))
  })
})

describe('find', () => {
  test('Returns undefined if empty', () => {
    expect(find()).toBeFalsy()
  })

  test('Can find an item from an array', () => {
    const array = [1, 2, 3]
    const result = find(array, item => item === 2)

    expect(result).toBe(2)
  })

  test('Polyfills if Array.prototype is undefined', () => {
    const fn = Array.prototype.find
    // Temporarily remove the prototype
    // eslint-disable-next-line
    Array.prototype.find = undefined

    const array = [1, 2, 3]
    const result = find(array, item => item === 2)

    expect(result).toBe(2)

    // Restore the prototype
    // eslint-disable-next-line
    Array.prototype.find = fn
  })
})
