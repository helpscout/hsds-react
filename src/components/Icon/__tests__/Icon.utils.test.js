import { renameSVGIds } from '../utils'

describe('renameSVGIds', () => {
  test('Returns the argument, if falsy', () => {
    expect(renameSVGIds(false)).toBe(false)
    expect(renameSVGIds(undefined)).toBe(undefined)
    expect(renameSVGIds(null)).toBe(null)
  })

  test('Returns the svg (string)', () => {
    const svg = '<svg></svg>'

    expect(renameSVGIds(svg)).toBe(svg)
  })

  test('Replaces the id with a namespace', () => {
    const svg = '<svg xlink="#app"></svg>'
    const result = renameSVGIds(svg, 'app')

    expect(result).not.toBe(svg)
    expect(result).not.toContain('#app')
    expect(result).toContain('#hsds-icons-app')
  })

  test('Replaces the "id" (quotes) with a namespace', () => {
    const svg = '<svg id="app"></svg>'
    const result = renameSVGIds(svg, 'app')

    expect(result).not.toBe(svg)
    expect(result).not.toContain('id="app"')
    expect(result).toContain('hsds-icons-app')
  })
})
