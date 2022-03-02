import isString from 'lodash.isstring'
import isNumber from 'lodash.isnumber'

export const isPlainContent = entity => {
  return isString(entity) || isNumber(entity)
}
