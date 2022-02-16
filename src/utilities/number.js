import isNil from 'lodash.isnil'
import isNumber from 'lodash.isnumber'

export const isEven = number => Number(number) % 2 === 0

export const isOdd = number => !isEven(number)

export const getMiddleIndex = number => {
  const middle = Math.floor(Number(number) / 2)

  return isOdd(number) ? middle : middle - 1
}

export const formatNumber = num => {
  if (isNil(num)) return num
  if (!isNumber(num)) return num

  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
