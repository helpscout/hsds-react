import { FieldAction, FieldValue } from './EditableField.types'
import { isArray, isObject } from '../../utilities/is'
import { find } from '../../utilities/arrays'

export const COMPONENT_KEY = 'EditableField'

export const ACTION_ICONS = {
  delete: 'cross-small',
  link: 'new-window',
  plus: 'plus-small',
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
  return isArray(value)
    ? value.map(val => createNewFieldValue({ value: val, name }, defaultOption))
    : [createNewFieldValue({ value, name }, defaultOption)]
}

export function createNewValueFieldFactory(uuidFn) {
  return function createNewValueFieldObject(
    { value, name },
    defaultOption: string | null
  ): FieldValue {
    // If it's an object already, grab the fields first
    if (isObject(value)) {
      const fieldObj = { ...value, id: uuidFn(`${name}_`) }

      if (defaultOption !== null && !Boolean(value.option)) {
        fieldObj.option = defaultOption
      }

      return fieldObj
    }

    const fieldObj: any = { value, id: uuidFn(`${name}_`) }

    if (defaultOption !== null) {
      fieldObj.option = defaultOption
    }

    return fieldObj
  }
}

export function generateFieldActions(actions): FieldAction[] | [] {
  /**
   * We need different handling of `null` and `undefined`,
   * because by default the "delete" action gets added (so if actions is `undefined`, you get "delete")
   * and if you explicitly want to remove this behaviour, you can pass `null`.
   */

  if (actions === null) return []

  if (actions === undefined) {
    return [deleteAction]
  }

  // User is also able to override the action
  let actionsArray: FieldAction[] = Array.isArray(actions) ? actions : [actions]
  let isDeleteActionPresent = find(
    actionsArray,
    action => action.name === 'delete'
  )

  return isDeleteActionPresent
    ? actionsArray
    : actionsArray.concat(deleteAction)
}

export function isEllipsisActive(e) {
  return e.offsetWidth < e.scrollWidth
}
