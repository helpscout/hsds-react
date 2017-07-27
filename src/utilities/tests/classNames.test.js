import classNames from '../classNames'

test('Consolidate arguments into a single string, separated by spaces', () => {
  const o = classNames('a', 'b', 'c')

  expect(o).toBe('a b c')
})

test('Remove falsy arguments', () => {
  const falsy = 10 > 100;
  const o = classNames(
    'a',
    'b',
    'c',
    falsy && 'd'
  );

  expect(o).toBe('a b c')
})

test('Remove `true` from final output', () => {
  const o = classNames(
    'a',
    'b',
    true,
    'c',
  );

  expect(o).toBe('a b c')
})

test('Return a string, even if arguments are numbers', () => {
  const o = classNames(
    1,
    2
  )

  expect(typeof o).toBe('string')
  expect(o).toBe('1 2')
})

test('Returns empty string by default', () => {
  expect(classNames()).toBe('')
})