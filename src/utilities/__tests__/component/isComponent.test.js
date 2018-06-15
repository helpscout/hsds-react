import { isComponent } from '../../component'

test('Returns correct boolean value for a (naive) assumption at a React component', () => {
  expect(isComponent()).toBe(false)
  expect(isComponent(123)).toBe(false)
  expect(isComponent('a')).toBe(false)
  expect(isComponent({})).toBe(true)
  expect(isComponent(() => {})).toBe(true)
})
