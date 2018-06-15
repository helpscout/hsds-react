import { getSequenceNames } from '../animation'

test('Returns an empty array if invalid arguments', () => {
  expect(getSequenceNames()).toEqual([])
  expect(getSequenceNames(true)).toEqual([])
  expect(getSequenceNames({})).toEqual([])
  expect(getSequenceNames([])).toEqual([])
})

test('Returns an array of names', () => {
  expect(getSequenceNames('fade up down')).toEqual(['fade', 'up', 'down'])
})

test('Handles white space', () => {
  expect(getSequenceNames('fade    up down')).toEqual(['fade', 'up', 'down'])
})

test('Handles white space before/after', () => {
  expect(getSequenceNames(' fade    up down ')).toEqual(['fade', 'up', 'down'])
})

test('Returns an array of names, if argument is array', () => {
  expect(getSequenceNames(['fade', 'up', 'down'])).toEqual([
    'fade',
    'up',
    'down',
  ])
})
