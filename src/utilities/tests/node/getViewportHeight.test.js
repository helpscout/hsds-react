import { getViewportHeight } from '../../node'

test('Returns height as a number', () => {
  expect(getViewportHeight()).toBeTruthy()
  expect(typeof getViewportHeight()).toBe('number')
})
