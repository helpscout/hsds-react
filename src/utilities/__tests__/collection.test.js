import { sample } from '../collection'

describe('sample', () => {
  test('Returns undefined if empty', () => {
    expect(sample()).toBeFalsy()
  })

  test('Returns a random item from an array', () => {
    const array = [1, 2, 3]

    expect(array).toContain(sample(array))
  })

  test('Returns a random value from an Object', () => {
    const o = {
      a: 1,
      b: 2,
      c: 3,
    }

    expect(Object.values(o)).toContain(sample(o))
  })
})
