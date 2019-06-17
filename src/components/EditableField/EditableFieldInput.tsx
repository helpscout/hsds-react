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
import { COMPONENT_KEY } from './EditableField.utils'
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

  inputRef: HTMLInputElement
  spanRef: HTMLSpanElement

  componentDidMount() {
    const { isEditing } = this.props

    if (isEditing) {
      const inputNode = this.inputRef

      inputNode && inputNode.focus()
    }
  }

  getClassName() {
    const { className } = this.props

    return classNames(EditableFieldInput.className, className)
  }

  handleFocus = event => {
    const { onFocus, name } = this.props

    onFocus({ name, event }).then(() => {
      const inputNode = this.inputRef

      inputNode && inputNode.select()
    })
  }

  handleBlur = event => {
    const { onBlur, name } = this.props

    onBlur({ name, event })
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
    if (event.key === key.ENTER || event.key === key.ESCAPE) {
      const { name, onKeyDown } = this.props

      onKeyDown({ event, name }).then(() => {
        const spanNode = this.spanRef

        spanNode && spanNode.focus()
      })
    }
  }

  handleDeleteClick = event => {
    const { name, onDelete } = this.props

    onDelete({ name, event }).then(() => {
      const spanNode = this.spanRef

      spanNode && spanNode.focus()
    })
  }

  handleButtonBlur = event => {
    const { name, onActionButtonBlur } = this.props

    onActionButtonBlur({ name, event }).then(() => {
      const spanNode = this.spanRef

      spanNode && spanNode.removeAttribute('tabIndex')
    })
  }

  handleSpanKeyDown = event => {
    const inputNode = this.inputRef

    if (event.key === key.ENTER) {
      inputNode && inputNode.focus()
    }
  }

  render() {
    const { name, placeholder, isEditing, type, value, ...rest } = this.props

    return (
      <FieldContentUI
        className={classNames(this.getClassName(), isEditing && 'is-editing')}
      >
        <FieldInputUI
          {...getValidProps(rest)}
          className="c-EditableField__input"
          id={name}
          innerRef={node => {
            this.inputRef = node
          }}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
        />
        <FieldStaticValueUI
          className="c-EditableField__staticValue"
          innerRef={node => {
            this.spanRef = node
          }}
          tabIndex={isEditing ? undefined : '0'}
          onKeyDown={this.handleSpanKeyDown}
        >
          {value ? (
            <Truncate>{value}</Truncate>
          ) : (
            <span className="is-placeholder">{placeholder}</span>
          )}
        </FieldStaticValueUI>

        <FocusIndicatorUI className="c-EditableField__focusIndicator" />

        {value ? (
          <FieldActionsUI className="c-EditableField__actions">
            <FieldButtonUI
              className="c-FieldButton action-delete"
              tabIndex={isEditing ? '0' : '-1'}
              type="button"
              onClick={this.handleDeleteClick}
              onBlur={this.handleButtonBlur}
            >
              <Icon name="cross-medium" />
            </FieldButtonUI>
          </FieldActionsUI>
        ) : null}
      </FieldContentUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(EditableFieldInput)

export default PropConnectedComponent
