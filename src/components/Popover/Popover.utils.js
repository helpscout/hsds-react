import isString from 'lodash.isstring'
import { isNumber } from '../../utilities/is'

export const isPlainContent = entity => {
  return isString(entity) || isNumber(entity)
}
