import { getViewportWidth } from '../../node'

test('Returns width as a number', () => {
  expect(getViewportWidth()).toBeTruthy()
  expect(typeof getViewportWidth()).toBe('number')
})
