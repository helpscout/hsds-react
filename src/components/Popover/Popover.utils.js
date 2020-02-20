import { isString, isNumber } from '../../utilities/is'

export const isPlainContent = entity => {
  return isString(entity) || isNumber(entity)
}
