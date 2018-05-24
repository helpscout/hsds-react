import { first, last } from '../arrays'

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
