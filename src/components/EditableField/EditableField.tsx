import * as React from 'react'

import {
  EditableFieldUI,
  LabelTextUI,
  AddButtonUI,
} from './styles/EditableField.css'
import EditableFieldInput from './EditableFieldInput'
import EventListener from '../EventListener'
import Icon from '../Icon'

import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import {
  COMPONENT_KEY,
  generateUniqueName,
  deleteAction,
} from './EditableField.utils'
import { key } from '../../constants/Keys'
import { noop } from '../../utilities/other'
import { createUniqueIDFactory } from '../../utilities/id'

import {
  EditableFieldProps,
  EditableFieldState,
  Value,
  ValueObj,
} from './EditableField.types'

const nextUuid = createUniqueIDFactory('Field')

export class EditableField extends React.PureComponent<
  EditableFieldProps,
  EditableFieldState
> {
  static className = 'c-EditableField'
  static defaultProps = {
    innerRef: noop,
    initialValue: '',
    type: 'text',
    value: '',
  }

  constructor(props) {
    super(props)

    const { actions, value } = props
    let initialValue = value

    if (Array.isArray(value)) {
      initialValue = value.map(val => ({
        value: val,
        id: nextUuid(`${props.name}_`),
      }))
    }
    let newActionsArray = []

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

    this.state = {
      initialValue,
      value: initialValue,
      editingField: '',
      actions: newActionsArray,
    }
  }

  editableFieldRef: HTMLDivElement

  setEditableNode = node => {
    this.editableFieldRef = node
  }

  getClassName() {
    const { className } = this.props
    return classNames(EditableField.className, className)
  }

  getNewValue = ({ inputValue, name }) => {
    const { value } = this.state

    return Array.isArray(value)
      ? (value as ValueObj[]).map(val => {
          if (val.id === name) {
            return { ...val, value: inputValue }
          }
          return val
        })
      : inputValue
  }

  handleInputChange = ({ inputValue, name, event }) => {
    const { onChange } = this.props
    const newValue = this.getNewValue({ inputValue, name })

    this.setState(
      {
        value: newValue,
      },
      () => {
        if (onChange) {
          onChange({ name, value: newValue, event })
        }
      }
    )
  }

  handleInputKeyDown = ({ event, name }) => {
    return new Promise(resolve => {
      const { onEnter, onEscape, onInputBlur } = this.props
      const { initialValue, value } = this.state
      const { key: eventKey } = event
      const isShiftTab = event.shiftKey && eventKey === key.TAB
      const isEnter = eventKey === key.ENTER
      const isEscape = eventKey === key.ESCAPE
      let newValue = initialValue
      let newInitialValue = initialValue

      if (isEnter || isShiftTab) {
        if (Array.isArray(value) && !event.currentTarget.value) {
          const filteredValues = (value as ValueObj[]).filter(val =>
            Boolean(val.value)
          )

          newValue =
            filteredValues.length > 0
              ? filteredValues
              : [{ value: '', id: nextUuid(`${name}_`) }]
        } else {
          newValue = this.getNewValue({
            inputValue: event.currentTarget.value,
            name,
          })
        }
        newInitialValue = newValue
      }

      this.setState(
        {
          value: newValue,
          initialValue: newInitialValue,
          editingField: '',
        },
        () => {
          resolve()

          if (isEnter && onEnter) {
            onEnter({ name, value: newValue, event })
          }

          if (isEscape && onEscape) {
            onEscape({ name, value: initialValue, event })
          }

          if (isShiftTab && onInputBlur) {
            onInputBlur({ name, value: newValue, event })
          }
        }
      )
    })
  }

  handleInputFocus = ({ name, event }) => {
    const { onFocus } = this.props

    return new Promise(resolve => {
      this.setState(
        {
          editingField: name,
        },
        () => {
          resolve()

          if (onFocus) {
            const { value } = this.state

            onFocus({ event, name, value })
          }
        }
      )
    })
  }

  handleInputBlur = ({ name, event }) => {
    const { onFieldBlur } = this.props
    const { value } = this.state

    return new Promise(resolve => {
      this.setState(
        {
          editingField: '',
        },
        () => {
          resolve()

          if (onFieldBlur) {
            onFieldBlur({ event, name, value })
          }
        }
      )
    })
  }

  handleFieldBlur = ({ name, event }) => {
    const { onFieldBlur } = this.props
    const { value } = this.state

    return new Promise(resolve => {
      this.setState(
        {
          editingField: '',
        },
        () => {
          resolve()

          if (onFieldBlur) {
            onFieldBlur({ event, name, value })
          }
        }
      )
    })
  }

  handleAddValue = () => {
    const { value } = this.state
    const isNotSingleEmptyValue = value[value.length - 1] !== ''

    if (isNotSingleEmptyValue) {
      const { name } = this.props
      const id = nextUuid(`${name}_`)
      const newValue = (value as ValueObj[]).concat({ value: '', id })

      this.setState({
        value: newValue,
        editingField: id,
      })
    }
  }

  handleDeleteAction = ({ action, name, event }) => {
    const { name: propsName } = this.props
    const { value } = this.state
    const e = { ...event }

    let newValue: Value = ''
    let newState: {
      value: Value
      editingField: string
    } = { value: '', editingField: '' }

    if (Array.isArray(value)) {
      newValue = (value as ValueObj[]).filter(val => val.id !== name)
      newState.value =
        newValue.length > 0
          ? newValue
          : [{ value: '', id: nextUuid(`${propsName}_`) }]
    }

    this.setState(newState, () => {
      if (action.callback && typeof action.callback === 'function') {
        action.callback({ name, action, value, event: e })
      }
    })
  }

  handleCustomAction = ({ action, name, event }) => {
    const { value } = this.state

    if (action.callback && typeof action.callback === 'function') {
      action.callback({ name, action, value, event })
    }
  }

  handleOnDocumentBodyMouseDown = (event: Event) => {
    if (!event) return
    if (!this.state.editingField) return

    const targetNode = event.target

    if (targetNode instanceof Element) {
      if (document.activeElement === targetNode) return

      const { name } = this.props
      const { value } = this.state

      if (Array.isArray(value)) {
        const newvalue = (value as ValueObj[]).filter(val => Boolean(val.value))

        this.setState({
          editingField: '',
          value:
            newvalue.length > 0
              ? newvalue
              : [{ value: '', id: nextUuid(`${name}_`) }],
        })
      } else {
        this.setState({
          editingField: '',
        })
      }
    }
  }

  renderInputFields() {
    const { name, type, ...rest } = this.props
    const { actions, value, editingField } = this.state

    if (Array.isArray(value)) {
      const isSingleEmptyValue =
        value.length === 1 && (value as ValueObj[])[0].value === ''

      return (
        <div>
          {(value as ValueObj[]).map(val => {
            return (
              <EditableFieldInput
                {...getValidProps(rest)}
                actions={actions}
                name={val.id}
                isEditing={editingField === val.id}
                key={val.id}
                type={type}
                value={val.value}
                onBlur={this.handleFieldBlur}
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                onKeyDown={this.handleInputKeyDown}
                customAction={this.handleCustomAction}
                deleteAction={this.handleDeleteAction}
              />
            )
          })}

          {!isSingleEmptyValue ? (
            <AddButtonUI type="button" onClick={this.handleAddValue}>
              <Icon name="plus-medium" />
            </AddButtonUI>
          ) : null}
        </div>
      )
    }
    const fieldName = generateUniqueName(name)

    return (
      <EditableFieldInput
        {...getValidProps(rest)}
        actions={actions}
        name={fieldName}
        isEditing={editingField === fieldName}
        type={type}
        value={value}
        onBlur={this.handleFieldBlur}
        onChange={this.handleInputChange}
        onFocus={this.handleInputFocus}
        onKeyDown={this.handleInputKeyDown}
        customAction={this.handleCustomAction}
        deleteAction={this.handleDeleteAction}
      />
    )
  }

  render() {
    const { label, name, type, value, ...rest } = this.props

    return (
      <EditableFieldUI {...getValidProps(rest)} innerRef={this.setEditableNode}>
        <label
          className="c-EditableField__label"
          htmlFor={generateUniqueName(name)}
        >
          <LabelTextUI className="c-EditableField__labelText">
            {label}
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
