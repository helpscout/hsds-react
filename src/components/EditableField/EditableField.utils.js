import { isObject } from '../../utilities/is'
import { find } from '../../utilities/arrays'
import { getColor } from '../../styles/utilities/color'
import { createUniqueIDFactory } from '../../utilities/id'
const uniqueID = createUniqueIDFactory('EditableField')

export const EF_COMPONENT_KEY = 'EditableField'
export const COMPOSITE_COMPONENT_KEY = 'EditableFieldComposite'
export const ACTIONS_COMPONENT_KEY = 'FieldActions'
export const INPUT_COMPONENT_KEY = 'FieldInput'
export const MASK_COMPONENT_KEY = 'FieldMask'
export const TRUNCATED_COMPONENT_KEY = 'Truncated'

export function normalizeFieldValue({
  value,
  name,
  defaultOption,
  currentFieldValue,
}) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return [createNewValueFieldObject('', name, defaultOption)]
    }
    return value.map(val => createNewValueFieldObject(val, name, defaultOption))
  } else {
    const currentId = currentFieldValue && currentFieldValue[0].id
    return [createNewValueFieldObject(value, name, defaultOption, currentId)]
  }
}

export function createNewValueFieldObject(
  value,
  name,
  defaultOption,
  currentId
) {
  // If it's an object already, grab the fields first
  if (isObject(value)) {
    const fieldObj = {
      ...value,
      id: currentId || value.id || `${name}_${uniqueID()}`,
      validated: false,
    }

    if (defaultOption !== null && !Boolean(value.option)) {
      fieldObj.option = defaultOption
    }

    return fieldObj
  }

  const fieldObj = {
    value,
    id: currentId || `${name}_${uniqueID()}`,
    validated: false,
  }

  if (defaultOption !== null) {
    fieldObj.option = defaultOption
  }

  return fieldObj
}

const deleteAction = {
  name: 'delete',
}

export function generateFieldActions(actions) {
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
  let actionsArray = Array.isArray(actions) ? actions : [actions]
  let isDeleteActionPresent = find(
    actionsArray,
    action => action.name === 'delete'
  )

  return isDeleteActionPresent
    ? actionsArray
    : actionsArray.concat(deleteAction)
}

export function isEllipsisActive(element) {
  if (!element) return false

  return element.offsetWidth < element.scrollWidth
}

export function findParentByClassName(childNode, className) {
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
  validation: `${INPUT_COMPONENT_KEY}__validation`,
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
  secondChunk: `${TRUNCATED_COMPONENT_KEY}__secondChunk`,
}

export const OTHERCOMPONENTS_CLASSNAMES = {
  dropdownItem: 'c-DropdownItem',
  truncate: 'c-Truncate',
  truncateContent: 'c-Truncate__content',
  dropdownTrigger: 'c-DropdownTrigger',
  icon: 'c-Icon',
}

export const STATES_CLASSNAMES = {
  hasOptions: 'has-options',
  hasActiveFields: 'has-activeFields',
  fieldDisabled: 'field-disabled',
  isActive: 'is-active',
  isDisabled: 'is-disabled',
  isEmphasized: 'is-emphasized',
  isEmpty: 'is-empty',
  isHidden: 'is-hidden',
  isInline: 'is-inline',
  isLarge: 'is-large',
  isPlaceholder: 'is-placeholder',
  isTemporaryValue: 'is-temporary-value',
  error: 'is-error',
  warning: 'is-warning',
  withPlaceholder: 'with-placeholder',
  withValidation: 'with-validation',
  withFloatingLabels: 'with-floatingLabels',
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
    warning: getColor('yellow.500'),
  },
}

export function getValidationColor(validationInfo) {
  let color =
    COLOURS.states[(validationInfo && validationInfo.type) || 'default']

  if (validationInfo && validationInfo.color) {
    color = validationInfo.color
  }

  return color
}
