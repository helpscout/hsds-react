import { FieldAction, FieldValue } from './EditableField.types'
import { isArray, isObject } from '../../utilities/is'

export const COMPONENT_KEY = 'EditableField'

export const ACTION_ICONS = {
  delete: 'cross-medium',
  link: 'link',
  plus: 'plus-medium',
  valueOption: 'chevron-down',
}

export const deleteAction: FieldAction = {
  name: 'delete',
}

export function normalizeFieldValue({
  value,
  name,
  createNewFieldValue,
}): any[] {
  let fieldValue: any[] = []

  if (isArray(value)) {
    fieldValue = value.map(val => createNewFieldValue({ value: val, name }))
  } else {
    fieldValue.push(createNewFieldValue({ value, name }))
  }

  return fieldValue
}

export function createNewValueFieldFactory(uuidFn) {
  return function createNewValueFieldObject({ value, name }): FieldValue {
    if (isObject(value)) {
      return { ...value, id: uuidFn(`${name}_`) }
    }
    return { value, id: uuidFn(`${name}_`) }
  }
}

export function generateFieldActions(actions): FieldAction[] | [] {
  let newActionsArray: FieldAction[] = []

  if (actions !== null) {
    if (actions === undefined) {
      newActionsArray = [deleteAction]
    } else {
      newActionsArray = Array.isArray(actions) ? actions : [actions]

      let isDeleteActionPresent =
        newActionsArray.filter(action => action.name === 'delete').length > 0

      newActionsArray = isDeleteActionPresent
        ? newActionsArray
        : newActionsArray.concat(deleteAction)
    }
  }

  return newActionsArray
}
