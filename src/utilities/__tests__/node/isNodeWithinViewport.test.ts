import { isNodeWithinViewport } from '../../node'

test('Returns false if node is not valid', () => {
  expect(isNodeWithinViewport({ node: false })).toBe(false)
  expect(isNodeWithinViewport({ node: {} })).toBe(false)
})

test('Returns false if node is not within viewport', () => {
  const mockNode = {
    nodeType: 1,
    getBoundingClientRect: () => ({
      y: 1000,
    }),
  }

  // @ts-ignore
  window.scrollY = 0
  // @ts-ignore
  window.innerHeight = 600

  expect(isNodeWithinViewport({ node: mockNode })).toBe(false)
})

test('Returns true if node is within viewport', () => {
  const mockNode = {
    nodeType: 1,
    getBoundingClientRect: () => ({
      y: 10,
    }),
  }

  // @ts-ignore
  window.scrollY = 0
  // @ts-ignore
  window.innerHeight = 1000

  expect(isNodeWithinViewport({ node: mockNode })).toBe(true)
})
