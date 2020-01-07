import { stringifyArray } from './Accordion.utils'

describe('stringifyArray', () => {
  test('Convert an array to a string', () => {
    const arr = ['test', '1', '2', '3']

    expect(stringifyArray(arr)).toBe('1,2,3,test')
  })

  test('Stringify array is the same no matter the elements order', () => {
    const arr1 = ['1', '2', '3']
    const arr2 = ['3', '2', '1']

    expect(stringifyArray(arr1)).toBe(stringifyArray(arr2))
  })
})
