import { createUniqueIDFactory, noop } from '../constants'

describe('noop', () => {
  test('Does nothing', () => {
    expect(noop()).toBe(undefined)
  })
})

describe('createUniqueIDFactory', () => {
  test('Generates an numerical ID (string), without arguments', () => {
    const uid = createUniqueIDFactory()

    expect(uid()).toBe('1')
  })

  test('Generates an ID num with prefix', () => {
    const uid = createUniqueIDFactory('prefix')

    expect(uid()).toBe('prefix1')
  })

  test('Auto-increments ID num on every call', () => {
    const uid = createUniqueIDFactory('prefix')
    uid() // 1
    uid() // 2
    uid() // 3
    uid() // 4
    // Next call should be 5
    expect(uid()).toBe('prefix5')
  })
})
