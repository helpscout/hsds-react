import { default as utils, easing, node, other } from '../index'

test('Can import a simple utility', () => {
  expect(other).toBeTruthy()
  expect(typeof other).toBe('object')
})

test('Can import a utility with nested dependencies', () => {
  expect(easing).toBeTruthy()
  expect(typeof easing).toBe('object')
})

test('Can import all utils', () => {
  expect(utils).toBeTruthy()
  expect(typeof utils).toBe('object')
  expect(utils.other).toBe(other)
})

test('Can use imported util', () => {
  const { isNodeElement } = node
  expect(isNodeElement(true)).not.toBe(true)
})
