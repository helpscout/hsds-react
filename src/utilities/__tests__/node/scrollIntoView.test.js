import { scrollIntoView } from '../../node'

test('Does not fire scroll methods on non-Elements', () => {
  const spy = jest.fn()
  scrollIntoView({ scrollIntoView: spy })

  expect(spy).not.toHaveBeenCalled()
})

test('Favors scrollIntoViewIfNeeded, if available', () => {
  const node = document.createElement('div')
  const spy = jest.fn()
  node.scrollIntoViewIfNeeded = spy
  scrollIntoView(node)

  expect(spy).toHaveBeenCalled()
})

test('Favors scrollIntoView, if scrollIntoViewIfNeeded is not available', () => {
  const node = document.createElement('div')
  const spy = jest.fn()
  node.scrollIntoViewIfNeeded = undefined
  node.scrollIntoView = spy
  scrollIntoView(node)

  expect(spy).toHaveBeenCalled()
})
