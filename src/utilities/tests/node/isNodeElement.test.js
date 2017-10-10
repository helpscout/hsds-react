import {
  isNodeElement
} from '../../node'

test('Returns true for valid node elements', () => {
  const o = document.createElement('div')

  expect(isNodeElement(o)).toBeTruthy()
  expect(isNodeElement(document)).toBeTruthy()
  expect(isNodeElement(document.body)).toBeTruthy()
})

test('Returns false for invalid elements', () => {
  expect(isNodeElement()).not.toBeTruthy()
  expect(isNodeElement(true)).not.toBeTruthy()
  expect(isNodeElement('div')).not.toBeTruthy()
  expect(isNodeElement(window)).not.toBeTruthy()
  expect(isNodeElement({})).not.toBeTruthy()
})
