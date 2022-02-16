import isNumber from 'lodash.isnumber'
import shadows from '../configs/shadows'
import { isDefined } from '../../utilities/is'

export const defaultShadow = '0 0 0 rgba(0, 0, 0)'

export const getShadow = value => {
  if (!isDefined(value)) return defaultShadow

  const shadowValue = isNumber(value) ? value.toString() : value
  const shadow = shadows[shadowValue]

  return shadow || defaultShadow
}
