import pluralize from '../pluralize'

test('Pluralizes a zero count', () => {
  expect(pluralize('message', 0)).toBe('messages')
})

test('Pluralizes a one count', () => {
  expect(pluralize('message', 1)).toBe('message')
})

test('Pluralizes a +2 count', () => {
  expect(pluralize('message', 100)).toBe('messages')
})

test('Pluralizes a one count, by default', () => {
  expect(pluralize('message')).toBe('message')
})

test('Returns an empty string if value arg is falsy', () => {
  // @ts-ignore
  expect(pluralize()).toBe('')
})
