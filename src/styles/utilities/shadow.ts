import shadows from '../configs/shadows'
import { isNumber } from '../../utilities/is'

export const getShadow = (value: string | number): string => {
  const shadowValue = isNumber(value) ? value.toString() : value
  const shadow = shadows[shadowValue]

  return shadow || '0 0 0 rgba(0, 0, 0)'
}
