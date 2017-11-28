import {
  hasContentOverflowX
} from '../../node'

test('Returns false for invalid elements', () => {
  expect(hasContentOverflowX()).not.toBeTruthy()
  expect(hasContentOverflowX(true)).not.toBeTruthy()
  expect(hasContentOverflowX('div')).not.toBeTruthy()
  expect(hasContentOverflowX(window)).not.toBeTruthy()
  expect(hasContentOverflowX({})).not.toBeTruthy()
})
