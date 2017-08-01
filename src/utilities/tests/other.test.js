import { noop } from '../other'

describe('noop', () => {
  test('Does nothing', () => {
    expect(noop()).toBe(undefined)
  })
})
