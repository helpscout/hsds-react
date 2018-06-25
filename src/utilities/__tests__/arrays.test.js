import { first, last, random } from '../arrays'

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
