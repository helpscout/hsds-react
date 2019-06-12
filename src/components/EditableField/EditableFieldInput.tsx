import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import {
  EditableFieldInputProps,
  EditableFieldInputState,
} from './EditableField.types'
import {
  FieldInputUI,
  FieldContentUI,
  FieldStaticValueUI,
  FieldActionsUI,
  FieldButtonUI,
} from './styles/EditableField.css'
import { COMPONENT_KEY } from './EditableField.utils'
import { key } from '../../constants/Keys'

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

  handleBlur = () => {
    const { onBlur } = this.props

    this.setState({
      isEditing: false,
    })

    onBlur()
  }

  handleChange = e => {
    this.props.onChange({
      inputValue: e.currentTarget.value,
      name: this.props.name,
    })
  }

  handleKeyDown = e => {
    if (e.key === key.ENTER || e.key === key.ESCAPE) {
      const { name, onKeyDown } = this.props
      const spanNode = this.spanRef

      onKeyDown({ e, name, spanNode })
    }
  }

  handleSpanKeyDown = e => {
    const inputNode = this.inputRef

    if (e.key === key.ENTER) {
      inputNode && inputNode.focus()
    }
  }

  getClassName() {
    const { className } = this.props
    return classNames(EditableFieldInput.className, className)
  }

  render() {
    const { name, type, value } = this.props
    const { isEditing } = this.state

    return (
      <FieldContentUI
        className={classNames(this.getClassName(), isEditing && 'is-editing')}
      >
        <FieldInputUI
          className="c-EditableField__input"
          id={name}
          innerRef={node => {
            this.inputRef = node
          }}
          name={name}
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
          tabIndex={isEditing ? '-1' : '0'}
          onKeyDown={this.handleSpanKeyDown}
        >
          {value}
        </FieldStaticValueUI>
      </FieldContentUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(EditableFieldInput)

export default PropConnectedComponent
