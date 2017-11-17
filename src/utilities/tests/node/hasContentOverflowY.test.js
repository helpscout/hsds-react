import {
  hasContentOverflowY
} from '../../node'

test('Returns false for invalid elements', () => {
  expect(hasContentOverflowY()).not.toBeTruthy()
  expect(hasContentOverflowY(true)).not.toBeTruthy()
  expect(hasContentOverflowY('div')).not.toBeTruthy()
  expect(hasContentOverflowY(window)).not.toBeTruthy()
  expect(hasContentOverflowY({})).not.toBeTruthy()
})
