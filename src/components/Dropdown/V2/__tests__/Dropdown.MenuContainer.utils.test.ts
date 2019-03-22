import { getComputedClientRect } from '../Dropdown.MenuContainer.utils'

describe('getComputedClientRect', () => {
  test('Returns zero values if invalid node', () => {
    // @ts-ignore
    const results = getComputedClientRect()

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
    } as HTMLElement

    const results = getComputedClientRect(node)

    expect(results.height).toBe(42)
    expect(results.top).toBe(332 + 42)
    expect(results.left).toBe(21)
  })
})
