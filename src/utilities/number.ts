import { isDefined, isNumber } from './is'

export const isEven = (number: string | number): boolean =>
  Number(number) % 2 === 0

export const isOdd = (number: string | number): boolean => !isEven(number)

export const getMiddleIndex = (number: string | number): number => {
  const middle = Math.floor(Number(number) / 2)

  return isOdd(number) ? middle : middle - 1
}

export const formatNumber = num => {
  if (!isDefined(num)) return num
  if (!isNumber(num)) return num

  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
