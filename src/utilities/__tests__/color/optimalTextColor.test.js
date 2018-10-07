import { optimalTextColor } from '../../color'

test('Returns null, if invalid arguments', () => {
  expect(optimalTextColor(null)).toEqual(null)
  expect(optimalTextColor(true)).toEqual(null)
  expect(optimalTextColor(111)).toEqual(null)
})

test('Returns white, if backgroundColor is too dark', () => {
  expect(optimalTextColor('#000000')).toEqual('white')
  expect(optimalTextColor('#111')).toEqual('white')
  expect(optimalTextColor('#343434')).toEqual('white')
  expect(optimalTextColor('#340000')).toEqual('white')
  expect(optimalTextColor('#340000')).toEqual('white')
  expect(optimalTextColor('#566')).toEqual('white')
  expect(optimalTextColor('#ff6688')).toEqual('white')
})

test('Returns black, if backgroundColor is too bright', () => {
  expect(optimalTextColor('#fff')).toEqual('black')
  expect(optimalTextColor('#eee')).toEqual('black')
  expect(optimalTextColor('#d9d9dd')).toEqual('black')
  expect(optimalTextColor('#c1cbd4')).toEqual('black')
})

test('Can provide custom RGB prop values', () => {
  const customValues = {
    r: 999,
    g: 999,
    b: 999,
  }
  expect(optimalTextColor('#ff6688', customValues)).toEqual('black')
})
