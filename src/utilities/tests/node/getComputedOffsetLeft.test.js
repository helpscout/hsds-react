import {
  getComputedWidthProps,
  getComputedOffsetLeft
} from '../../node'

test('Returns false if node (arg) is invalid', () => {
  expect(getComputedOffsetLeft()).not.toBeTruthy()
})

test('Returns offsetTop + document.body offsets', () => {
  const r = document.createElement('div')
  const p = r.getBoundingClientRect()
  const offset = getComputedWidthProps(document).offset / 2

  expect(getComputedOffsetLeft(r)).toBe(p.left + offset)
})
