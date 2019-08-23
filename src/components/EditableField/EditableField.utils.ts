import { FieldAction, FieldValue } from './EditableField.types'
import { isArray, isObject } from '../../utilities/is'
import { find } from '../../utilities/arrays'
import { getColor } from '../../styles/utilities/color'

export const EF_COMPONENT_KEY = 'EditableField'
export const COMPOSITE_COMPONENT_KEY = 'EditableFieldComposite'
export const ACTIONS_COMPONENT_KEY = 'FieldActions'
export const INPUT_COMPONENT_KEY = 'FieldInput'
export const MASK_COMPONENT_KEY = 'FieldMask'
export const TRUNCATED_COMPONENT_KEY = 'Truncated'

export const ACTION_ICONS = {
  delete: 'cross-small',
  link: 'new-window',
  plus: 'plus-small',
  valueOption: 'chevron-down',
}

export const deleteAction: FieldAction = {
  name: 'delete',
}

export const FIELDTYPES = {
  text: 'text',
  email: 'email',
  url: 'url',
  tel: 'tel',
  number: 'number',
  textarea: 'textarea',
}
export const FIELDSIZES = { md: 'md', lg: 'lg' }
export const FIELDSTATES = {
  default: 'default',
  error: 'error',
  warning: 'warning',
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
      const fieldObj = { ...value, id: uuidFn(`${name}_`), validated: false }

      if (defaultOption !== null && !Boolean(value.option)) {
        fieldObj.option = defaultOption
      }

      return fieldObj
    }

    const fieldObj: any = { value, id: uuidFn(`${name}_`), validated: false }

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
export function isEllipsisActive(element): boolean {
  if (!element) return false

  return element.offsetWidth < element.scrollWidth
}

export function findParentByClassName(
  childNode,
  className
): Element | undefined {
  /* istanbul ignore next */
  if (!childNode) return

  let parent = childNode.parentElement

  while (parent != null && !parent.classList.contains(className)) {
    parent = parent.parentElement
  }

  return parent
}

export const SIZES = {
  field: {
    height: {
      medium: '25px',
      large: '28px',
    },
    lineHeight: {
      medium: '25px',
      large: '28px',
    },
    font: {
      large: '18px',
      medium: '14px',
    },
  },
  fieldLabel: {
    font: {
      medium: '11px',
    },
  },
  floatingLabel: {
    font: {
      medium: '12px',
    },
  },
  input: {
    height: {
      medium: '23px',
      large: '28px',
    },
  },
  mask: {
    height: {
      medium: '23px',
      large: '28px',
    },
  },
  compositeMask: {
    font: {
      large: '20px',
      medium: '14px',
    },
    height: {
      medium: '24px',
      large: '27px',
    },
    lineHeight: {
      medium: '25px',
      large: '28px',
    },
  },
  focusIndicator: {
    active: '2px',
    inactive: '1px',
  },
}

export const EDITABLEFIELD_CLASSNAMES = {
  component: `c-${EF_COMPONENT_KEY}`,
  optionsWrapper: `${EF_COMPONENT_KEY}__optionsWrapper`,
  addButton: `${EF_COMPONENT_KEY}__addButton`,
  fieldWrapper: `${EF_COMPONENT_KEY}__fieldWrapper`,
  field: `${EF_COMPONENT_KEY}__field`,
  label: `${EF_COMPONENT_KEY}__label`,
  labelText: `${EF_COMPONENT_KEY}__labelText`,
}

export const COMPOSITE_CLASSNAMES = {
  component: `c-${COMPOSITE_COMPONENT_KEY}`,
  mask: 'ComposedMask',
  maskItem: 'ComposedMask__item',
}

export const INPUT_CLASSNAMES = {
  component: `c-${INPUT_COMPONENT_KEY}`,
  content: `${INPUT_COMPONENT_KEY}__content`,
  inputWrapper: `${INPUT_COMPONENT_KEY}__inputWrapper`,
  input: `${INPUT_COMPONENT_KEY}__input`,
  optionsWrapper: `${INPUT_COMPONENT_KEY}__optionsWrapper`,
  dropdown: `${INPUT_COMPONENT_KEY}__dropdown`,
  optionsTrigger: `${INPUT_COMPONENT_KEY}__optionsTrigger`,
  optionsDropdown: `${INPUT_COMPONENT_KEY}__optionsDropdown`,
  selectedOption: `${INPUT_COMPONENT_KEY}__selectedOption`,
  focusIndicator: `${INPUT_COMPONENT_KEY}__focusIndicator`,
}

export const ACTIONS_CLASSNAMES = {
  actions: ACTIONS_COMPONENT_KEY,
  fieldButton: `${ACTIONS_COMPONENT_KEY}_button`,
}

export const MASK_CLASSNAMES = {
  component: `${MASK_COMPONENT_KEY}`,
  option: `${MASK_COMPONENT_KEY}__option`,
  value: `${MASK_COMPONENT_KEY}__value`,
}

export const TRUNCATED_CLASSNAMES = {
  component: TRUNCATED_COMPONENT_KEY,
  withSplitter: 'withSplitter',
  firstChunk: `${TRUNCATED_COMPONENT_KEY}__firstChunk`,
  splitterChunk: `${TRUNCATED_COMPONENT_KEY}__splitterChunk`,
  secondChunk: `${TRUNCATED_COMPONENT_KEY}__secondChunk`,
}

export const OTHERCOMPONENTS_CLASSNAMES = {
  dropdownItem: 'c-DropdownV2Item',
  truncate: 'c-Truncate',
  truncateContent: 'c-Truncate__content',
  dropdownTrigger: 'c-DropdownV2Trigger',
  icon: 'c-Icon',
}

export const STATES_CLASSNAMES = {
  hasOptions: 'has-options',
  hasActiveFields: 'has-activeFields',
  isActive: 'is-active',
  isDisabled: 'is-disabled',
  isEmphasized: 'is-emphasized',
  isEmpty: 'is-empty',
  isHidden: 'is-hidden',
  isInline: 'is-inline',
  isLarge: 'is-large',
  isPlaceholder: 'is-placeholder',
  isTemporaryValue: 'is-temporary-value',
  withPlaceholder: 'with-placeholder',
  error: 'is-error',
  warning: 'is-warning',
}

export const COLOURS = {
  mask: {
    border: getColor('charcoal.200'),
    disabled: getColor('charcoal.300'),
    focused: 'rgba(197, 208, 217, 0.5)',
    regular: getColor('charcoal.800'),
    placeholder: {
      regular: getColor('charcoal.300'),
      disabled: getColor('charcoal.200'),
      border: {
        regular: getColor('grey.800'),
        hover: getColor('blue.500'),
      },
    },
  },
  input: {
    regular: getColor('charcoal.800'),
    placeholder: getColor('grey.800'),
  },
  floatingLabel: getColor('grey.800'),
  focusIndicator: {
    active: getColor('blue.500'),
    inactive: '#c6d0d8',
  },
  invisible: 'transparent',
  button: {
    regular: 'slategray',
    hover: '#3c5263',
    delete: getColor('red.500'),
  },
  states: {
    default: getColor('blue.500'),
    error: getColor('red.500'),
  },
}

export function findChangedField(original, updated) {
  const originalLength = original.length
  const updatedLength = updated.length

  // A new one was added, return it
  if (updatedLength - originalLength === 1) {
    return updated[updatedLength - 1]
  } else if (originalLength === updatedLength) {
    let culprit

    original.forEach(function(a, i) {
      Object.keys(a).forEach(function(k) {
        if (a[k] !== updated[i][k]) {
          culprit = updated[i]
        }
      })
    })

    return culprit
  }

  return undefined
}

/* istanbul ignore next */
export function ignoreClick(event, editableFieldRef) {
  if (!event) {
    return true
  }

  if (editableFieldRef.contains(event.target)) {
    return true
  }

  return false

  // if (!activeField) {
  //   return true
  // }

  const targetNode = event.target
  // console.log('HSDS: ignoreClick -> targetNode', targetNode)

  if (targetNode instanceof Element) {
    if (document.activeElement === targetNode) {
      return true
    }

    // if (
    //   editableFieldRef.contains(targetNode) &&
    //   targetNode.classList.contains(INPUT_CLASSNAMES.input)
    // ) {
    // return true
    // }

    // Avoid acting on anything that comes from the options/dropdown
    if (
      targetNode.classList.contains(OTHERCOMPONENTS_CLASSNAMES.dropdownItem) ||
      targetNode.classList.contains(OTHERCOMPONENTS_CLASSNAMES.truncateContent)
    ) {
      return true
    }

    const optionsNode = editableFieldRef.querySelector(
      `.${EDITABLEFIELD_CLASSNAMES.optionsWrapper}`
    )

    if (optionsNode && optionsNode.contains(targetNode)) {
      return true
    }

    return false
  }

  return true
}
