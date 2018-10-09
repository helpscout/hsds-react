import { getComputedWidthProps } from '../../node'

test('Returns empty if node (arg) is invalid', () => {
  expect(getComputedWidthProps()).toEqual({
    width: 0,
    offset: 0,
  })
})

test('Accepts document as a node prop', () => {
  const o = getComputedWidthProps(document)

  expect(o.width).not.toBe(null)
  expect(o.offset).not.toBe(null)
})

test('Accepts document.body as a node prop', () => {
  const o = getComputedWidthProps(document.body)
  expect(o.width).not.toBe(null)
  expect(o.offset).not.toBe(null)
})

test('Accepts node element as a node prop', () => {
  const n = document.createElement('div')
  const o = getComputedWidthProps(n)

  expect(o.width).not.toBe(null)
  expect(o.offset).not.toBe(null)
})

test('Returns object with height + offset values from document', () => {
  const props = getComputedWidthProps(document)

  expect(props.width).not.toBe(null)
  expect(props.offset).toBeTruthy()
})

test('Returns object with height + offset values from node', () => {
  const h = document.createElement('div')
  h.style.margin = '50px'

  const props = getComputedWidthProps(h)
  // Cannot test width. node.offsetWidth isn't supported in JSDOM
  expect(props.offset).toBe(100)
})
