import { getHeightRelativeToViewport } from '../Drop.utils'

test('Returns false for invalid arguments', () => {
  expect(getHeightRelativeToViewport()).toBeFalsy()
  expect(getHeightRelativeToViewport(true)).toBeFalsy()
  expect(getHeightRelativeToViewport({})).toBeFalsy()
})

test('Returns false if node is not an element', () => {
  expect(getHeightRelativeToViewport({ node: true })).toBeFalsy()
})

test('Returns height (number) if node is beyond viewport range', () => {
  // Note: JSDOM's window dimensions are 1024x768
  const node = document.createElement('div')
  node.getBoundingClientRect = () => ({
    width: 200,
    height: 400,
    top: 500,
    left: 8,
    right: 0,
    bottom: 0,
  })

  const options = { node, offset: 0 }
  const o = getHeightRelativeToViewport(options)

  expect(o).not.toBeFalsy()
  expect(typeof o).toBe('number')
  expect(o).toBeGreaterThan(200)
  expect(o).toBeLessThan(768)
})

test('Returns null if node is within viewport range', () => {
  // Note: JSDOM's window dimensions are 1024x768
  const node = document.createElement('div')
  node.getBoundingClientRect = () => ({
    width: 200,
    height: 200,
    top: 0,
    left: 8,
    right: 0,
    bottom: 0,
  })

  const options = { node, offset: 0 }
  const o = getHeightRelativeToViewport(options)

  expect(o).toBe(null)
})

test('Factors in offset', () => {
  // Note: JSDOM's window dimensions are 1024x768
  const node = document.createElement('div')
  node.getBoundingClientRect = () => ({
    width: 200,
    height: 500,
    top: 300,
    left: 8,
    right: 0,
    bottom: 0,
  })

  const o = getHeightRelativeToViewport({ node })
  const n = getHeightRelativeToViewport({ node, offset: 20 })

  expect(o).not.toBe(n)
  expect(o - n).toBe(20)
})
