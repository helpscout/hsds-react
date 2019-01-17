import { noop, promiseNoop } from '../other'

describe('noop', () => {
  test('Does nothing', () => {
    expect(noop()).toBe(undefined)
  })
})

describe('promiseNoop', () => {
  test('Does nothing', () => {
    expect(promiseNoop()).resolves.toBe(undefined)
  })
})
