import { scrollIntoView } from '../scrolling'

describe('scrollIntoView', () => {
  test('Returns falsy if node is null', () => {
    expect(scrollIntoView(null)).toBeFalsy()
  })
})
