import { getScrollParent } from '../../node'

test('Returns null for invalid arguments', () => {
  expect(getScrollParent()).toBe(null)
  expect(getScrollParent(true)).toBe(null)
  expect(getScrollParent('div')).toBe(null)
  expect(getScrollParent({})).toBe(null)
})
