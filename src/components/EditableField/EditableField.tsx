import * as React from 'react'

import {
  EditableFieldUI,
  LabelTextUI,
  AddButtonUI,
} from './styles/EditableField.css'
import EditableFieldInput from './EditableField.Input'
import EventListener from '../EventListener'
import Icon from '../Icon'

import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import {
  EF_COMPONENT_KEY,
  createNewValueFieldFactory,
  generateFieldActions,
  getComponentClassNames,
  normalizeFieldValue,
  ACTION_ICONS,
} from './EditableField.utils'
import { key } from '../../constants/Keys'
import { noop } from '../../utilities/other'
import { createUniqueIDFactory } from '../../utilities/id'
import { isArray } from '../../utilities/is'
import { find } from '../../utilities/arrays'
import * as equal from 'fast-deep-equal'

import {
  EditableFieldProps,
  EditableFieldState,
  FieldValue,
} from './EditableField.types'

const nextUuid = createUniqueIDFactory(EF_COMPONENT_KEY)
const createNewFieldValue = createNewValueFieldFactory(nextUuid)

const CLASSNAMES: any = getComponentClassNames(EF_COMPONENT_KEY)
const EMPTY_VALUE = ''

export class EditableField extends React.Component<
  EditableFieldProps,
  EditableFieldState
> {
  static className = CLASSNAMES.component
  static defaultProps = {
    type: 'text',
    defaultOption: null,
    disabled: false,
    emphasizeTopValue: false,
    multipleValues: false,
    renderFieldsAsBlocks: false,
    value: EMPTY_VALUE,
    innerRef: noop,
    onInputFocus: noop,
    onInputBlur: noop,
    onInputChange: noop,
    onOptionFocus: noop,
    onOptionChange: noop,
    onChange: noop,
    onEnter: noop,
    onEscape: noop,
    onAdd: noop,
    onCommit: noop,
    onDelete: noop,
    onDiscard: noop,
  }

  constructor(props) {
    super(props)

    const {
      actions,
      name,
      value,
      defaultOption,
      multipleValues,
      valueOptions,
    } = props

    let defaultStateOption: string | null = null

    if (valueOptions) {
      defaultStateOption = defaultOption ? defaultOption : valueOptions[0]
    }

    const initialFieldValue = normalizeFieldValue({
      value,
      name,
      createNewFieldValue,
      defaultOption: defaultStateOption,
    })

    this.state = {
      actions: generateFieldActions(actions),
      activeField: EMPTY_VALUE,
      fieldValue: initialFieldValue,
      initialFieldValue,
      multipleValuesEnabled: isArray(value) || multipleValues,
      valueOptions:
        valueOptions && isArray(valueOptions)
          ? valueOptions.map(option => ({
              id: option,
              label: option,
              value: option,
            }))
          : null,
      defaultOption: defaultStateOption,
      focusedByLabel: false,
    }
  }

  editableFieldRef: HTMLDivElement

  setEditableNode = node => {
    this.editableFieldRef = node
    this.props.innerRef(node)
  }

  getClassName() {
    const { className, disabled } = this.props
    return classNames(
      EditableField.className,
      className,
      disabled && CLASSNAMES.isDisabled
    )
  }

  assignInputValueToFieldValue = ({ inputValue, name }) => {
    const { fieldValue } = this.state

    return fieldValue.map(val => {
      if (val.id === name) {
        return { ...val, value: inputValue }
      }
      return val
    })
  }

  handleInputFocus = ({ name, event }) => {
    const { onInputFocus } = this.props
    const { fieldValue } = this.state

    this.setState({
      focusedByLabel: false,
      activeField: name,
    })

    onInputFocus({ name, value: fieldValue, event })
  }

  handleInputBlur = ({ name, event }) => {
    const { onInputBlur } = this.props
    const { fieldValue, focusedByLabel } = this.state
    /* istanbul ignore else */
    if (!focusedByLabel) {
      this.setState({
        activeField: EMPTY_VALUE,
      })

      onInputBlur({
        name,
        value: fieldValue,
        event,
      })
    }
  }

  handleInputChange = ({ inputValue, name, event }) => {
    const { onChange, onInputChange } = this.props
    const newFieldValue = this.assignInputValueToFieldValue({
      inputValue,
      name,
    })

    this.setState({
      fieldValue: newFieldValue,
    })

    onChange({ name, value: newFieldValue, event })
    onInputChange({ name, value: newFieldValue, event })
  }

  handleInputKeyDown = ({ event, name }) => {
    return new Promise(resolve => {
      const { onEnter, onEscape, onCommit, onDiscard } = this.props
      const {
        initialFieldValue,
        fieldValue,
        multipleValuesEnabled,
      } = this.state
      const inputValue = event.currentTarget.value
      const isEnter = event.key === key.ENTER
      const isEscape = event.key === key.ESCAPE
      const cachedEvent = { ...event }

      if (isEnter) {
        const impactedField = find(initialFieldValue, val => val.id === name)
        // Case 1: in multi-value fields if value is empty
        // Do nothing
        if (multipleValuesEnabled && inputValue === EMPTY_VALUE) {
          return
        }
        // Case 2: value was not changed
        // Just change active status
        else if (impactedField && inputValue === impactedField.value) {
          this.setState({ activeField: EMPTY_VALUE }, () => {
            resolve()

            onEnter({ name, value: fieldValue, event: cachedEvent })
          })
        } else {
          // Case 2: value was changed
          // change active status, field value and update initialFieldValue
          const updatedFieldValue = fieldValue.map(val => {
            /* istanbul ignore else */
            if (val.id === name) {
              val.value = inputValue
            }
            return val
          })

          this.setState(
            {
              activeField: EMPTY_VALUE,
              fieldValue: updatedFieldValue,
              initialFieldValue: updatedFieldValue,
            },
            () => {
              resolve()

              onEnter({ name, value: updatedFieldValue, event: cachedEvent })
              onCommit({ name, value: updatedFieldValue })
            }
          )
        }
      }

      if (isEscape) {
        // Change active status and return fieldValue to initialValue
        this.setState(
          { activeField: EMPTY_VALUE, fieldValue: initialFieldValue },
          () => {
            resolve()

            onEscape({ name, value: initialFieldValue, event: cachedEvent })
            onDiscard({ value: initialFieldValue })
          }
        )
      }
    })
  }

  handleOptionFocus = ({ name, event }) => {
    const { onOptionFocus } = this.props

    this.setState({
      activeField: name,
    })

    onOptionFocus({ name, value: this.state.fieldValue, event })
  }

  handleOptionSelection = ({ name, selection }) => {
    const { onChange, onOptionChange, onCommit } = this.props
    const { fieldValue } = this.state
    let newFieldValue: FieldValue[] = []
    let changed = false

    for (const value of fieldValue) {
      /* istanbul ignore else */
      if (value.id === name && value.option !== selection) {
        value.option = selection
        changed = true
      }

      newFieldValue.push(value)
    }
    /* istanbul ignore else */
    if (changed) {
      this.setState({ fieldValue: newFieldValue, activeField: name }, () => {
        onOptionChange({ name, selection, value: newFieldValue })
        onChange({ name, value: newFieldValue })
        onCommit({ name, value: newFieldValue })
      })
    }
  }

  handleAddValue = () => {
    const { onAdd } = this.props
    const { fieldValue, defaultOption } = this.state
    const isNotSingleEmptyValue =
      fieldValue[fieldValue.length - 1].value !== EMPTY_VALUE
    /* istanbul ignore next */
    if (isNotSingleEmptyValue) {
      // it is tested
      const { name } = this.props
      const newValueObject = createNewFieldValue(
        {
          value: EMPTY_VALUE,
          name,
        },
        defaultOption
      )
      const newFieldValue = fieldValue.concat(newValueObject)
      const newState: any = {
        fieldValue: newFieldValue,
        activeField: newValueObject.id,
      }
      this.setState(newState)

      onAdd({ name, value: newFieldValue })
    }
  }

  handleDeleteAction = ({ action, name, event }) => {
    const { onCommit, onDelete } = this.props
    const { defaultOption, fieldValue } = this.state
    const cachedEvent = { ...event }
    let updatedFieldValue: FieldValue[]

    // Clearing value
    // When there is only one item in the fieldValue array
    if (fieldValue.length === 1) {
      const emptyValue = { ...fieldValue[0] }

      emptyValue.value = EMPTY_VALUE
      /* istanbul ignore next */
      if (defaultOption != null) {
        emptyValue.option = defaultOption
      }

      updatedFieldValue = [emptyValue]
    } else {
      // Deleting value
      // Remove the item from the array
      updatedFieldValue = fieldValue.filter(val => val.id !== name)
    }

    this.setState(
      { fieldValue: updatedFieldValue, initialFieldValue: updatedFieldValue },
      () => {
        onDelete({ name, value: this.state.fieldValue, event })
        onCommit({ name, value: this.state.fieldValue })

        if (action.callback && typeof action.callback === 'function') {
          action.callback({
            name,
            action,
            value: fieldValue,
            event: cachedEvent,
          })
        }
      }
    )
  }

  handleCustomAction = ({ action, name, event }) => {
    const { fieldValue } = this.state

    if (action.callback && typeof action.callback === 'function') {
      action.callback({ name, action, value: fieldValue, event })
    }
  }

  handleOnDocumentBodyMouseDown = (event: Event) => {
    if (!event) return
    if (!this.state.activeField) return

    const targetNode = event.target

    /* istanbul ignore else */
    if (targetNode instanceof Element) {
      /* istanbul ignore if */
      if (document.activeElement === targetNode) return

      // Avoid acting on anything that comes from the options/dropdown
      /* istanbul ignore next */
      if (
        targetNode.classList.contains(CLASSNAMES.dropdownItem) ||
        targetNode.classList.contains(CLASSNAMES.truncateContent)
      )
        return

      const optionsNode = this.editableFieldRef.querySelector(
        `.${CLASSNAMES.optionsWrapper}`
      )
      /* istanbul ignore next */
      if (optionsNode && optionsNode.contains(targetNode)) return

      const { name } = this.props
      const { fieldValue, initialFieldValue } = this.state

      // Case 1: single field
      if (fieldValue.length === 1) {
        /* istanbul ignore next */
        // It's tested, go home Istanbul
        this.setState(
          {
            activeField: EMPTY_VALUE,
          },
          () => {
            if (!equal(initialFieldValue, this.state.fieldValue)) {
              this.props.onCommit({ name, value: this.state.fieldValue })
            }
          }
        )
      } else {
        // Case 2: multiple values
        /* istanbul ignore next */
        if (equal(initialFieldValue, this.state.fieldValue)) {
          // Case 2.A: value unchanged
          // It's tested, go home Istanbul
          this.setState({
            activeField: EMPTY_VALUE,
          })
        } else {
          // Case 2.B: value changed
          let updatedFieldValue: FieldValue[] = []
          let emptyFound: boolean = false

          for (const val of fieldValue) {
            /* istanbul ignore if */
            if (Boolean(val.value)) {
              updatedFieldValue.push(val)
            } else {
              emptyFound = true
            }
          }

          this.setState(
            { fieldValue: updatedFieldValue, activeField: EMPTY_VALUE },
            () => {
              if (emptyFound) {
                this.props.onDiscard({ value: this.state.fieldValue })
              } else {
                this.props.onCommit({ name, value: this.state.fieldValue })
              }
            }
          )
        }
      }
    }
  }

  renderAddButton = () => {
    const { disabled } = this.props
    const { fieldValue, multipleValuesEnabled } = this.state

    const isLastValueEmpty =
      fieldValue[fieldValue.length - 1].value === EMPTY_VALUE
    const isSingleAndEmpty = fieldValue.length === 1 && isLastValueEmpty

    return multipleValuesEnabled && !isSingleAndEmpty && !disabled ? (
      <AddButtonUI
        className={CLASSNAMES.addButton}
        type="button"
        onClick={this.handleAddValue}
        disabled={isLastValueEmpty}
      >
        <Icon name={ACTION_ICONS.plus} size="24" />
      </AddButtonUI>
    ) : null
  }

  renderInputFields = () => {
    const {
      name,
      disabled,
      emphasizeTopValue,
      renderFieldsAsBlocks,
      type,
      ...rest
    } = this.props
    const {
      actions,
      activeField,
      fieldValue,
      multipleValuesEnabled,
      valueOptions,
    } = this.state

    return (
      <div className={CLASSNAMES.mainContent}>
        {fieldValue.map((val, index) => {
          return (
            <EditableFieldInput
              {...getValidProps(rest)}
              actions={actions}
              disabled={disabled}
              emphasize={
                multipleValuesEnabled && emphasizeTopValue && index === 0
              }
              fieldValue={val}
              isActive={activeField === val.id}
              key={val.id}
              name={val.id}
              renderAsBlock={renderFieldsAsBlocks}
              type={type}
              valueOptions={valueOptions}
              onInputFocus={this.handleInputFocus}
              onInputBlur={this.handleInputBlur}
              onInputChange={this.handleInputChange}
              onOptionFocus={this.handleOptionFocus}
              onOptionSelection={this.handleOptionSelection}
              onChange={this.handleInputChange}
              onKeyDown={this.handleInputKeyDown}
              customAction={this.handleCustomAction}
              deleteAction={this.handleDeleteAction}
            />
          )
        })}

        {this.renderAddButton()}
      </div>
    )
  }

  handleLabelClick = e => {
    e.preventDefault()
    const { disabled } = this.props
    const { fieldValue } = this.state

    if (!disabled) {
      // @ts-ignore
      this.setState({ focusedByLabel: true, activeField: fieldValue[0].id })
    }
  }

  render() {
    const { label, name, type, value, ...rest } = this.props
    const { fieldValue } = this.state

    return (
      <EditableFieldUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        innerRef={this.setEditableNode}
      >
        <label
          className={CLASSNAMES.label}
          htmlFor={fieldValue[0].id}
          onClick={this.handleLabelClick}
        >
          <LabelTextUI className={CLASSNAMES.labelText}>
            {label || name}
          </LabelTextUI>
        </label>
        <EventListener
          event="mousedown"
          handler={this.handleOnDocumentBodyMouseDown}
        />

        {this.renderInputFields()}
      </EditableFieldUI>
    )
  }
}

const PropConnectedComponent = propConnect(EF_COMPONENT_KEY)(EditableField)

export default PropConnectedComponent
