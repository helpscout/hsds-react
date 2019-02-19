import { isString, isNumber } from '../../utilities/is'

export const COMPONENT_KEY = 'Popover'

export const isPlainContent = (entity: any): boolean => {
  return isString(entity) || isNumber(entity)
}
