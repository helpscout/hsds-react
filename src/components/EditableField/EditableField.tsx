import * as React from 'react'

import {
  EditableFieldUI,
  LabelTextUI,
  AddButtonUI,
} from './styles/EditableField.css'
import EditableFieldInput from './EditableFieldInput'
import Icon from '../Icon'

import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { COMPONENT_KEY, getFieldIndex } from './EditableField.utils'
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
    }
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

  handleInputChange = ({ inputValue, name }) => {
    this.setState({
      value: this.getNewValue({ inputValue, name }),
    })
  }

  handleInputKeyDown = ({ e, name, spanNode }) => {
    if (e.key === key.ENTER) {
      const newValue = this.getNewValue({
        inputValue: e.currentTarget.value,
        name,
      })

      this.setState(
        {
          value: newValue,
          initialValue: newValue,
        },
        () => {
          spanNode && spanNode.focus()
        }
      )
    } else if (e.key === key.ESCAPE) {
      const { initialValue } = this.state

      this.setState(
        {
          value: initialValue,
        },
        () => {
          spanNode && spanNode.focus()
        }
      )
    }
  }

  handleInputBlur = ({ name, e }) => {
    const { onBlur } = this.props

    if (onBlur) {
      const { value } = this.state
      onBlur({ e, name, value })
    }
  }

  handleAddValue = () => {
    const { value } = this.state
    const isNotSingleEmptyValue = value[value.length - 1] !== ''

    if (isNotSingleEmptyValue) {
      this.setState({
        value: value.concat(''),
      })
    }
  }

  handleDeleteValue = ({ name }) => {
    const { value } = this.state

    if (Array.isArray(value)) {
      const idx = getFieldIndex(name)
      const newValue = value.filter((val, index) => index !== idx)

      this.setState({ value: newValue.length > 0 ? newValue : [''] })
    } else {
      this.setState({ value: '' })
    }
  }

  renderInputFields() {
    const { name, type, ...rest } = this.props
    const { value } = this.state

    if (Array.isArray(value)) {
      return (
        <div>
          {value.map((val, idx) => (
            <EditableFieldInput
              {...getValidProps(rest)}
              name={`${name}_${idx}`}
              key={`${name}_${idx}`}
              type={type}
              value={val}
              onBlur={this.handleInputBlur}
              onChange={this.handleInputChange}
              onDelete={this.handleDeleteValue}
              onKeyDown={this.handleInputKeyDown}
            />
          ))}
          {value[0] !== '' ? (
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
        name={`${name}_0`}
        type={type}
        value={value}
        onBlur={this.handleInputBlur}
        onChange={this.handleInputChange}
        onDelete={this.handleDeleteValue}
        onKeyDown={this.handleInputKeyDown}
      />
    )
  }

  render() {
    const { label, name, type, value, ...rest } = this.props

    return (
      <EditableFieldUI {...getValidProps(rest)}>
        <label
          className="c-EditableField__label"
          htmlFor={Array.isArray(value) ? `${name}_0` : name}
        >
          <LabelTextUI className="c-EditableField__labelText">
            {label}
          </LabelTextUI>
        </label>

        {this.renderInputFields()}
      </EditableFieldUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(EditableField)

export default PropConnectedComponent
