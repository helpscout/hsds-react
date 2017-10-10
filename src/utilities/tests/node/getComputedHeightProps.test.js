import {
  getComputedHeightProps
} from '../../node'

test('Returns false if node (arg) is invalid', () => {
  expect(getComputedHeightProps()).not.toBeTruthy()
})

test('Accepts document as a node prop', () => {
  const o = getComputedHeightProps(document)

  expect(o.height).not.toBe(null)
  expect(o.offset).not.toBe(null)
})

test('Accepts document.body as a node prop', () => {
  const o = getComputedHeightProps(document.body)
  expect(o.height).not.toBe(null)
  expect(o.offset).not.toBe(null)
})

test('Accepts node element as a node prop', () => {
  const n = document.createElement('div')
  const o = getComputedHeightProps(n)

  expect(o.height).not.toBe(null)
  expect(o.offset).not.toBe(null)
})

test('Returns object with height + offset values from document', () => {
  const props = getComputedHeightProps(document)

  expect(props.height).not.toBe(null)
  expect(props.offset).toBeTruthy()
})

test('Returns object with height + offset values from node', () => {
  const h = document.createElement('div')
  h.style.margin = '50px'

  const props = getComputedHeightProps(h)
  // Cannot test height. node.offsetHeight isn't supported in JSDOM
  expect(props.offset).toBe(100)
})
