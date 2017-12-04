import { getSequenceNames } from '../../animation'

test('Returns empty array for invalid argument', () => {
  const args = [
    '',
    1,
    [],
    true,
    false,
    {}
  ]

  args.forEach((arg) => {
    expect(Array.isArray(getSequenceNames(arg))).toBeTruthy()
    expect(getSequenceNames(arg).length).toBe(0)
  })
})

test('Returns an array of strings, split by space', () => {
  const o = getSequenceNames('fade down scale bounce')

  expect(Array.isArray(o)).toBeTruthy()
  expect(o.length).toBe(4)
  expect(o).toContain('fade')
  expect(o).toContain('down')
  expect(o).toContain('scale')
  expect(o).toContain('bounce')
  expect(o).not.toContain(' ')
})

test('Returns an array if argument is array', () => {
  const a = ['fade', 'down', 'scale', 'bounce']
  const o = getSequenceNames(a)

  expect(Array.isArray(o)).toBeTruthy()
  expect(o.length).toBe(4)
  expect(o).toContain('fade')
  expect(o).toContain('down')
  expect(o).toContain('scale')
  expect(o).toContain('bounce')
  expect(o).not.toContain(' ')
})
