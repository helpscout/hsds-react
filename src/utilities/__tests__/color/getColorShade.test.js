import { getColorShade } from '../../color'

test('Returns null, if invalid arguments', () => {
  expect(getColorShade()).toBe(null)
  expect(getColorShade(true)).toBe(null)
  expect(getColorShade(111)).toBe(null)
})

test('Returns "lightest" for lightest colors', () => {
  expect(getColorShade('#fff')).toBe('lightest')
  expect(getColorShade('#eee')).toBe('lightest')
  expect(getColorShade('#e6e6e6')).toBe('lightest')
  expect(getColorShade('#e5e5e5')).toBe('lightest')
  expect(getColorShade('#e4e4d4')).toBe('lightest')
  expect(getColorShade('#ddd')).toBe('lightest')
})

test('Returns "light" for light colors', () => {
  expect(getColorShade('#ccc')).toBe('light')
  expect(getColorShade('#bbb')).toBe('light')
  expect(getColorShade('#ffa3ff')).toBe('light')
  expect(getColorShade('#50E3C2')).toBe('light')
  expect(getColorShade('#aaa')).toBe('light')
  expect(getColorShade('#9e9e9e')).toBe('light')
  expect(getColorShade('#5fa5f7')).toBe('light')
  expect(getColorShade('#9c9c9c')).toBe('light')
  expect(getColorShade('#777')).toBe('light')
  expect(getColorShade('#2dc09f')).toBe('light')
  expect(getColorShade('#56c288')).toBe('light')
  expect(getColorShade('#ffc646')).toBe('light')
  expect(getColorShade('#ff9139')).toBe('light')
})

test('Returns "dark" for dark colors', () => {
  expect(getColorShade('#666')).toBe('dark')
  expect(getColorShade('#555')).toBe('dark')
  expect(getColorShade('#333')).toBe('dark')
  expect(getColorShade('#282828')).toBe('dark')
  expect(getColorShade('#c50aa7')).toBe('dark')
  expect(getColorShade('#027caf')).toBe('dark')
  expect(getColorShade('#8e5dd0')).toBe('dark')
  expect(getColorShade('#0077cc')).toBe('dark')
  expect(getColorShade('#e6261c')).toBe('dark')
  expect(getColorShade('#556575')).toBe('dark')
})

test('Returns "darkest" for light colors', () => {
  expect(getColorShade('#272727')).toBe('darkest')
  expect(getColorShade('#222')).toBe('darkest')
  expect(getColorShade('#111')).toBe('darkest')
  expect(getColorShade('#000')).toBe('darkest')
})

test('Can provide custom RGB prop values', () => {
  const darkValues = {
    r: 9,
    g: 9,
    b: 9,
  }
  const lightValues = {
    r: 999,
    g: 999,
    b: 999,
  }
  expect(getColorShade('#767676', darkValues)).toEqual('dark')
  expect(getColorShade('#767676', lightValues)).toEqual('light')
})
