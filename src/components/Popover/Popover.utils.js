import { isString, isNumber } from '../../utilities/is'

export const isPlainContent = (entity: any): boolean => {
  return isString(entity) || isNumber(entity)
}
