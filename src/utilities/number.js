export const isEven = (number: string): boolean => number % 2 === 0

export const isOdd = (number: string): boolean => !isEven(number)

export const getMiddleIndex = (number: string): number => {
  const middle = Math.floor(number / 2)

  return isOdd(number) ? middle : middle - 1
}

export const formatNumber = num => {
  if (num === null || num === undefined) {
    return num
  }
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
