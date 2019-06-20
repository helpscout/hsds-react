import * as React from 'react'

import {
  FieldInputUI,
  FieldContentUI,
  FieldStaticValueUI,
  FocusIndicatorUI,
  FieldActionsUI,
  FieldButtonUI,
} from './styles/EditableField.css'
import Icon from '../Icon'
import Truncate from '../Truncate'

import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { ACTION_ICONS, COMPONENT_KEY } from './EditableField.utils'
import { key } from '../../constants/Keys'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

import { EditableFieldInputProps } from './EditableField.types'

export class EditableFieldInput extends React.PureComponent<
  EditableFieldInputProps
> {
  static className = 'c-EditableFieldInput'
  static defaultProps = {
    isEditing: false,
    innerRef: noop,
    onBlur: noop,
    onChange: noop,
    onKeyDown: noop,
    type: 'text',
    value: '',
  }

  actionsRef: HTMLDivElement
  editableFieldInputRef: HTMLDivElement
  inputRef: HTMLInputElement
  staticValueRef: HTMLSpanElement

  setActionsNode = node => {
    this.actionsRef = node
  }

  setEditableFieldInputNode = node => {
    this.editableFieldInputRef = node
  }

  setInputNode = node => {
    this.inputRef = node
  }

  setStaticValueNode = node => {
    this.staticValueRef = node
  }

  componentDidMount() {
    const { isEditing } = this.props

    this.calculateFieldWidth()

    if (isEditing) {
      const inputNode = this.inputRef

      inputNode && inputNode.focus()
    }
  }

  componentDidUpdate = () => {
    this.calculateFieldWidth()
  }

  calculateFieldWidth = () => {
    const { actions, isEditing } = this.props

    const editableFieldInputNode = this.editableFieldInputRef
    const actionsNode = this.actionsRef
    const staticValueNode = this.staticValueRef
    const staticValueWidth = staticValueNode.getBoundingClientRect().width

    if (isEditing) {
      editableFieldInputNode.style.width = '100%'
      // if (actionsNode) {
      //     actionsNode.style.width = `${actions.length * 25}px`
      // }
      // else {
      //   const actionsWidth = actionsNode.getBoundingClientRect().width
      //   editableFieldInputNode.style.width = `calc(100% - ${actionsWidth}px)`
      // }
    } else {
      editableFieldInputNode.style.width = `${staticValueWidth}px`
    }
  }

  getClassName() {
    const { className } = this.props

    return classNames(EditableFieldInput.className, className)
  }

  handleFocus = event => {
    const { onFocus, name } = this.props

    onFocus({ name, event })
  }

  handleInputBlur = event => {
    const { name, onBlur } = this.props

    onBlur({ name, event }).then(() => {
      const staticValueNode = this.staticValueRef

      staticValueNode && staticValueNode.removeAttribute('tabIndex')
    })
  }

  handleChange = event => {
    const { onChange } = this.props

    onChange({
      inputValue: event.currentTarget.value,
      name: this.props.name,
      event,
    })
  }

  handleKeyDown = event => {
    const isShiftTab = event.shiftKey && event.key === key.TAB
    const isEnter = event.key === key.ENTER
    const isEscape = event.key === key.ESCAPE

    if (isEnter || isEscape) {
      const { name, onKeyDown } = this.props

      onKeyDown({ event, name }).then(() => {
        const staticValueNode = this.staticValueRef

        if (staticValueNode) {
          staticValueNode.setAttribute('tabIndex', '0')
          staticValueNode.focus()
        }
      })
    }
    if (isShiftTab) {
      const { name, onKeyDown } = this.props

      onKeyDown({ event, name }).then(() => {
        const staticValueNode = this.staticValueRef

        staticValueNode && staticValueNode.removeAttribute('tabIndex')
      })
    }
  }

  handleActionClick = ({ action, event }) => {
    const { name, value } = this.props

    if (action.name === 'delete') {
      this.props.deleteAction({ action, name, event })
    }
    if (action.name === 'link') {
      window && window.open(value)
    } else {
      this.props.customAction({ action, name, event })
    }
  }

  handleButtonBlur = event => {
    const { name, onBlur } = this.props

    onBlur({ name, event }).then(() => {
      const staticValueNode = this.staticValueRef

      staticValueNode && staticValueNode.removeAttribute('tabIndex')
    })
  }

  handleStaticValueKeyDown = event => {
    const inputNode = this.inputRef

    if (event.key === key.ENTER) {
      inputNode && inputNode.focus()
    }
  }

  handleStaticValueBlur = () => {
    const staticValueNode = this.staticValueRef

    staticValueNode && staticValueNode.removeAttribute('tabIndex')
  }

  renderActions = () => {
    const { actions, value } = this.props

    if (value && actions) {
      const actionsArray = Array.isArray(actions) ? actions : [actions]

      return (
        <FieldActionsUI
          className="c-EditableField__actions"
          innerRef={this.setActionsNode}
          numberOfActions={actionsArray.length}
        >
          {actionsArray.map(action => {
            return (
              <FieldButtonUI
                className={`c-FieldButton action-${action.name}`}
                key={action.name}
                tabIndex="-1"
                type="button"
                onClick={event => {
                  this.handleActionClick({ action, event })
                }}
              >
                <Icon name={action.icon || ACTION_ICONS[action.name]} />
              </FieldButtonUI>
            )
          })}
        </FieldActionsUI>
      )
    }
    return null
  }

  render() {
    const { name, placeholder, isEditing, type, value, ...rest } = this.props

    return (
      <FieldContentUI
        className={classNames(this.getClassName(), isEditing && 'is-editing')}
        innerRef={this.setEditableFieldInputNode}
      >
        <FieldInputUI
          {...getValidProps(rest)}
          className="c-EditableField__input"
          id={name}
          innerRef={this.setInputNode}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onBlur={this.handleInputBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
        />
        <FieldStaticValueUI
          className="c-EditableField__staticValue"
          innerRef={this.setStaticValueNode}
          onBlur={this.handleStaticValueBlur}
          onKeyDown={this.handleStaticValueKeyDown}
        >
          {value ? (
            <Truncate>{value}</Truncate>
          ) : (
            <span className="is-placeholder">{placeholder}</span>
          )}
        </FieldStaticValueUI>

        <FocusIndicatorUI className="c-EditableField__focusIndicator" />

        {this.renderActions()}
      </FieldContentUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(EditableFieldInput)

export default PropConnectedComponent
