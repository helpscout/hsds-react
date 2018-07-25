import forEach from '../forEach'

test('Returns an empty string for invalid args', () => {
  expect(forEach()).toEqual('')
  expect(forEach(0)).toEqual('')
  expect(forEach('thing')).toEqual('')
  expect(forEach('thing', () => {})).toEqual('')
})

test('Compiles an array into a single CSS string', () => {
  const sizes = [1, 2, 3]
  const styles = forEach(
    sizes,
    size => `
    .size-${size} {
      font-size: ${size}px;
    }
  `
  )

  expect(typeof styles).toBe('string')
  expect(styles).toContain('.size-1')
  expect(styles).toContain('.size-2')
  expect(styles).toContain('.size-3')
  expect(styles).toContain('font-size: 1px')
  expect(styles).toContain('font-size: 2px')
  expect(styles).toContain('font-size: 3px')
})
