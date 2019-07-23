import { FieldAction, FieldValue } from './EditableField.types'
import { isArray, isObject } from '../../utilities/is'
import { find } from '../../utilities/arrays'

export const EF_COMPONENT_KEY = 'EditableField'
export const EF_I_COMPONENT_KEY = 'EditableFieldInput'
export const EF_TRUNC_COMPONENT_KEY = 'EditableFieldTruncate'

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

/* istanbul ignore next */
export function isEllipsisActive(e) {
  return e.offsetWidth < e.scrollWidth
}

export function getComponentClassNames(componentKey) {
  if (componentKey === EF_I_COMPONENT_KEY) return EF_INPUT_CLASSNAMES
  if (componentKey === EF_TRUNC_COMPONENT_KEY) return EF_TRUNC_CLASSNAMES

  // Return main component classes by default
  return EF_CLASSNAMES
}

const EF_CLASSNAMES = {
  component: `c-${EF_COMPONENT_KEY}`,
  optionsWrapper: `${EF_COMPONENT_KEY}__optionsWrapper`,
  addButton: `${EF_COMPONENT_KEY}__addButton`,
  mainContent: `${EF_COMPONENT_KEY}__main`,
  label: `${EF_COMPONENT_KEY}__label`,
  labelText: `${EF_COMPONENT_KEY}__labelText`,
  isDisabled: 'is-disabled',
  dropdownItem: 'c-DropdownV2Item',
  truncateContent: 'c-Truncate__content',
}

const EF_INPUT_CLASSNAMES = {
  component: `c-${EF_I_COMPONENT_KEY}`,
  interactiveContent: `${EF_I_COMPONENT_KEY}__interactiveContent`,
  inputWrapper: `${EF_I_COMPONENT_KEY}__inputWrapper`,
  input: `${EF_I_COMPONENT_KEY}__input`,
  actions: `${EF_I_COMPONENT_KEY}__actions`,
  fieldButton: 'FieldButton',
  staticContent: `${EF_I_COMPONENT_KEY}__staticContent`,
  staticOption: `${EF_I_COMPONENT_KEY}__staticOption`,
  staticValue: `${EF_I_COMPONENT_KEY}__staticValue`,
  optionsWrapper: `${EF_I_COMPONENT_KEY}__optionsWrapper`,
  dropdown: `${EF_I_COMPONENT_KEY}__Dropdown`,
  optionsTrigger: `${EF_I_COMPONENT_KEY}__optionsTrigger`,
  optionsDropdown: `${EF_I_COMPONENT_KEY}__optionsDropdown`,
  selectedOption: `${EF_I_COMPONENT_KEY}__selectedOption`,
  dropDownTrigger: 'c-DropdownV2Trigger',
  focusIndicator: `${EF_I_COMPONENT_KEY}__focusIndicator`,
  withPlaceholder: 'with-placeholder',
  isPlaceholder: 'is-placeholder',
  isEmphasized: 'is-emphasized',
  isActive: 'is-active',
  hasOptions: 'has-options',
  isEmpty: 'is-empty',
  isTemporaryValue: 'is-temporary-value',
}

const EF_TRUNC_CLASSNAMES = {
  truncated: 'Truncated',
  withSplitter: 'TruncatedWithSplitter',
  firstChunk: 'TruncateFirstChunk',
  splitterChunk: 'TruncateSplitterChunk',
  secondChunk: 'TruncateSecondChunk',
  content: 'c-Truncate__content',
}
