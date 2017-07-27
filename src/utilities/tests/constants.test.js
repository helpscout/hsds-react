import { noop } from '../constants'

describe('noop', () => {
  test('Does nothing', () => {
    expect(noop()).toBe(undefined)
  })
})
