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
  defaultOption,
}): FieldValue[] {
  let fieldValue: FieldValue[] = []

  if (isArray(value)) {
    fieldValue = value.map(val =>
      createNewFieldValue({ value: val, name }, defaultOption)
    )
  } else {
    fieldValue.push(createNewFieldValue({ value, name }, defaultOption))
  }

  return fieldValue
}

export function createNewValueFieldFactory(uuidFn) {
  return function createNewValueFieldObject(
    { value, name },
    defaultOption?
  ): FieldValue {
    if (isObject(value)) {
      const fieldObj = { ...value, id: uuidFn(`${name}_`) }

      if (defaultOption != null && !Boolean(value.option)) {
        fieldObj.option = defaultOption
      }

      return fieldObj
    }
    const fieldObj: any = { value, id: uuidFn(`${name}_`) }
    if (defaultOption != null) {
      fieldObj.option = defaultOption
    }

    return fieldObj
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
