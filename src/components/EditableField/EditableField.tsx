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
  COMPONENT_KEY,
  createNewValueFieldFactory,
  generateFieldActions,
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

const nextUuid = createUniqueIDFactory('EditableField')
const createNewFieldValue = createNewValueFieldFactory(nextUuid)

export class EditableField extends React.Component<
  EditableFieldProps,
  EditableFieldState
> {
  static className = 'c-EditableField'
  static defaultProps = {
    type: 'text',
    defaultOption: null,
    disabled: false,
    emphasizeTopValue: false,
    multipleValues: false,
    value: '',
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
      if (defaultOption) {
        defaultStateOption = defaultOption
      } else {
        defaultStateOption = valueOptions[0]
      }
    }

    const initialFieldValue = normalizeFieldValue({
      value,
      name,
      createNewFieldValue,
      defaultOption: defaultStateOption,
    })

    this.state = {
      actions: generateFieldActions(actions),
      activeField: '',
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
      disabled && 'is-disabled'
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

    if (!focusedByLabel) {
      this.setState({
        activeField: '',
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
      const { initialFieldValue, fieldValue } = this.state
      const inputValue = event.currentTarget.value
      const isEnter = event.key === key.ENTER
      const isEscape = event.key === key.ESCAPE
      const cachedEvent = { ...event }

      if (isEnter) {
        const impactedField = find(fieldValue, val => val.id === name)
        // Case 1: value was not changed
        // Just change active status
        if (inputValue === impactedField.value) {
          this.setState({ activeField: '' }, () => {
            resolve()

            onEnter({ name, value: fieldValue, event: cachedEvent })
          })
        } else {
          // Case 2: value was changed
          // change active status, field value and update initialFieldValue
          const updatedFieldValue = fieldValue.map(val => {
            if (val.id === name) {
              val.value = inputValue
            }
            return val
          })

          this.setState(
            {
              activeField: '',
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
          { activeField: '', fieldValue: initialFieldValue },
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
      if (value.id === name && value.option !== selection) {
        value.option = selection
        changed = true
      }

      newFieldValue.push(value)
    }

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
    const isNotSingleEmptyValue = fieldValue[fieldValue.length - 1].value !== ''

    if (isNotSingleEmptyValue) {
      const { name } = this.props
      const newValueObject = createNewFieldValue(
        {
          value: '',
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
    const { fieldValue, defaultOption } = this.state
    const cachedEvent = { ...event }
    let updatedFieldValue: FieldValue[]

    // Clearing value
    // When there is only one item in the fieldValue array
    if (fieldValue.length === 1) {
      const emptyValue = { ...fieldValue[0] }

      emptyValue.value = ''

      if (defaultOption != null) {
        /* istanbul ignore next */
        emptyValue.option = defaultOption
      }

      updatedFieldValue = [emptyValue]
    } else {
      // Deleting value
      // Remove the item from the array
      updatedFieldValue = fieldValue.filter(val => val.id !== name)
    }

    this.setState({ fieldValue: updatedFieldValue }, () => {
      onDelete({ name, value: this.state.fieldValue, event })
      onCommit({ name, value: this.state.fieldValue })

      if (action.callback && typeof action.callback === 'function') {
        action.callback({ name, action, value: fieldValue, event: cachedEvent })
      }
    })
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

    if (targetNode instanceof Element) {
      /* istanbul ignore if */
      if (document.activeElement === targetNode) return
      /* istanbul ignore if */
      if (this.editableFieldRef.contains(targetNode)) return
      /* istanbul ignore if */
      if (targetNode.classList.contains('c-DropdownV2Item')) return

      const { name } = this.props
      const { fieldValue, initialFieldValue } = this.state

      // Case 1: single field
      if (fieldValue.length === 1) {
        /* istanbul ignore next */
        // It's tested, go home Istanbul
        this.setState(
          {
            activeField: '',
          },
          () => {
            if (!equal(initialFieldValue, this.state.fieldValue)) {
              this.props.onCommit({ name, value: this.state.fieldValue })
            }
          }
        )
      } else {
        // Case 2: multiple values
        if (equal(initialFieldValue, this.state.fieldValue)) {
          // Case 2.A: value unchanged
          /* istanbul ignore next */
          // It's tested, go home Istanbul
          this.setState({
            activeField: '',
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
            { fieldValue: updatedFieldValue, activeField: '' },
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

  renderInputFields() {
    const { name, disabled, emphasizeTopValue, type, ...rest } = this.props
    const {
      actions,
      activeField,
      fieldValue,
      multipleValuesEnabled,
      valueOptions,
    } = this.state

    return (
      <div className="EditableField__main">
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

        {multipleValuesEnabled && !disabled ? (
          <AddButtonUI
            className="EditableField_addButton"
            type="button"
            onClick={this.handleAddValue}
          >
            <Icon name={ACTION_ICONS['plus']} size="20" />
          </AddButtonUI>
        ) : null}
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
          className="EditableField__label"
          htmlFor={fieldValue[0].id}
          onClick={this.handleLabelClick}
        >
          <LabelTextUI className="EditableField__labelText">
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

const PropConnectedComponent = propConnect(COMPONENT_KEY)(EditableField)

export default PropConnectedComponent
