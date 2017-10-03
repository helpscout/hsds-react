import {
  getComputedHeightProps,
  getComputedOffsetTop
} from '../../node'

test('Returns false if node (arg) is invalid', () => {
  expect(getComputedOffsetTop()).not.toBeTruthy()
})

test('Returns offsetTop + document.body offsets', () => {
  const r = document.createElement('div')
  const p = r.getBoundingClientRect()
  const offset = getComputedHeightProps(document).offset / 2

  expect(getComputedOffsetTop(r)).toBe(p.top + offset)
})
