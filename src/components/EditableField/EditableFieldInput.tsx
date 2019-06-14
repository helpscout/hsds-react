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

import {
  EditableFieldInputProps,
  EditableFieldInputState,
} from './EditableField.types'

export class EditableFieldInput extends React.PureComponent<
  EditableFieldInputProps,
  EditableFieldInputState
> {
  static className = 'c-EditableFieldInput'
  static defaultProps = {
    innerRef: noop,
    onBlur: noop,
    onChange: noop,
    onKeyDown: noop,
    type: 'text',
    value: '',
  }

  inputRef: HTMLInputElement
  spanRef: HTMLSpanElement

  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
    }
  }

  componentDidMount() {
    const { value } = this.props

    if (value === '') {
      this.setState(
        {
          isEditing: true,
        },
        () => {
          const inputNode = this.inputRef
          inputNode && inputNode.focus()
        }
      )
    }
  }

  handleFocus = () => {
    this.setState(
      {
        isEditing: true,
      },
      () => {
        const inputNode = this.inputRef
        inputNode && inputNode.select()
      }
    )
  }

  handleBlur = e => {
    const { onBlur, name } = this.props

    onBlur({ name, e })
  }

  handleChange = e => {
    const { onChange } = this.props

    onChange({
      inputValue: e.currentTarget.value,
      name: this.props.name,
    })
  }

  handleKeyDown = e => {
    if (e.key === key.ENTER || e.key === key.ESCAPE) {
      const { name, onKeyDown } = this.props
      const spanNode = this.spanRef

      onKeyDown({ e, name, spanNode })

      this.setState({
        isEditing: false,
      })
    }
  }

  handleSpanKeyDown = e => {
    const inputNode = this.inputRef

    if (e.key === key.ENTER) {
      inputNode && inputNode.focus()
    }
  }

  handleDeleteClick = () => {
    const { name, onDelete } = this.props

    onDelete({ name })

    this.setState({
      isEditing: false,
    })
  }

  getClassName() {
    const { className } = this.props
    return classNames(EditableFieldInput.className, className)
  }

  render() {
    const { name, placeholder, type, value, ...rest } = this.props
    const { isEditing } = this.state

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
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
        />
        <FieldStaticValueUI
          className="c-EditableField__staticValue"
          innerRef={node => {
            this.spanRef = node
          }}
          tabIndex={isEditing ? '-1' : '0'}
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
