import { getComputedClientRect } from '../Dropdown.MenuContainer.utils'

describe('getComputedClientRect', () => {
  test('Returns zero values if invalid node', () => {
    const results = getComputedClientRect(null, window)

    expect(results.height).toBe(0)
    expect(results.left).toBe(0)
    expect(results.top).toBe(0)
  })

  test('Returns getBoundingClientRect values', () => {
    const node = {
      getBoundingClientRect: () => ({
        height: 42,
        top: 332,
        left: 21,
      }),
    }

    const results = getComputedClientRect(node, window)

    expect(results.height).toBe(42)
    expect(results.top).toBe(332 + 42)
    expect(results.left).toBe(21)
  })
})
