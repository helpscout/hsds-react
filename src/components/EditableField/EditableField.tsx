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
  getFieldIndex,
  generateUniqueName,
} from './EditableField.utils'
import { key } from '../../constants/Keys'
import { noop } from '../../utilities/other'

import { EditableFieldProps, EditableFieldState } from './EditableField.types'

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

    this.state = {
      initialValue: props.value,
      value: props.value,
      editingField: '',
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
    const idx = getFieldIndex(name)

    return Array.isArray(value)
      ? value.map((val, index) => {
          if (index === idx) return inputValue
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
      const { initialValue } = this.state
      const { key: eventKey } = event
      const isShiftTab = event.shiftKey && eventKey === key.TAB
      const isEnter = eventKey === key.ENTER
      const isEscape = eventKey === key.ESCAPE
      let newValue = initialValue
      let newInitialValue = initialValue

      if (isEnter || isShiftTab) {
        newValue = this.getNewValue({
          inputValue: event.currentTarget.value,
          name,
        })
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
    const { onInputBlur } = this.props
    const { value } = this.state

    if (onInputBlur) {
      onInputBlur({ event, name, value })
    }
  }

  handleActionButtonBlur = ({ name, event }) => {
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
      const newValue = value.concat('')

      this.setState({
        value: newValue,
        editingField: `${name}_${newValue.length - 1}`,
      })
    }
  }

  handleDeleteValue = ({ name, event }) => {
    const { onDelete } = this.props
    const { value } = this.state
    let newValue: string | string[] = ''
    let newState: {
      value: string | string[]
      editingField: string
    } = { value: '', editingField: '' }

    if (Array.isArray(value)) {
      const idx = getFieldIndex(name)

      newValue = value.filter((__, index) => index !== idx)
      newState.value = newValue.length > 0 ? newValue : ['']
    }

    return new Promise(resolve => {
      this.setState(newState, () => {
        resolve()

        if (onDelete) {
          onDelete({ event, name, value: newValue })
        }
      })
    })
  }

  handleOnDocumentBodyClick = (event: Event) => {
    if (!event) return
    if (!this.state.editingField) return

    const targetNode = event.target
    const editableFieldNode = this.editableFieldRef

    if (targetNode instanceof Element) {
      if (
        editableFieldNode.contains(targetNode) ||
        targetNode === editableFieldNode
      ) {
        return
      }

      const { value } = this.state

      if (Array.isArray(value)) {
        this.setState({
          editingField: '',
          value: value.filter(Boolean),
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
    const { value, editingField } = this.state

    let fieldName = generateUniqueName(name)

    if (Array.isArray(value)) {
      const isNotSingleEmptyValue = value[0] !== ''

      return (
        <div>
          {value.map((val, idx) => {
            fieldName = generateUniqueName(name, idx)

            return (
              <EditableFieldInput
                {...getValidProps(rest)}
                name={fieldName}
                isEditing={editingField === fieldName}
                key={fieldName}
                type={type}
                value={val}
                onActionButtonBlur={this.handleActionButtonBlur}
                onBlur={this.handleInputBlur}
                onChange={this.handleInputChange}
                onDelete={this.handleDeleteValue}
                onFocus={this.handleInputFocus}
                onKeyDown={this.handleInputKeyDown}
              />
            )
          })}

          {isNotSingleEmptyValue ? (
            <AddButtonUI type="button" onClick={this.handleAddValue}>
              <Icon name="plus-medium" />
            </AddButtonUI>
          ) : null}
        </div>
      )
    }
    return (
      <EditableFieldInput
        {...getValidProps(rest)}
        name={fieldName}
        isEditing={editingField === fieldName}
        type={type}
        value={value}
        onActionButtonBlur={this.handleActionButtonBlur}
        onBlur={this.handleInputBlur}
        onChange={this.handleInputChange}
        onDelete={this.handleDeleteValue}
        onFocus={this.handleInputFocus}
        onKeyDown={this.handleInputKeyDown}
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
        <EventListener event="click" handler={this.handleOnDocumentBodyClick} />

        {this.renderInputFields()}
      </EditableFieldUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(EditableField)

export default PropConnectedComponent
