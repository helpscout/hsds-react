import { getNodeScope } from '../../node'

test('Returns node for valid elements', () => {
  const o = document.createElement('div')

  expect(getNodeScope(o)).toBe(o)
  expect(getNodeScope(document)).toBe(document)
})

test('Returns document for invalid arguments', () => {
  expect(getNodeScope()).toBe(document)
  expect(getNodeScope(true)).toBe(document)
  expect(getNodeScope('div')).toBe(document)
  expect(getNodeScope({})).toBe(document)
})

test('Returns window for window', () => {
  expect(getNodeScope(window)).toBe(window)
})
