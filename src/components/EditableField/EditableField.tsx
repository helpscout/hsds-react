import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { EditableFieldProps, EditableFieldState } from './EditableField.types'
import {
  EditableFieldUI,
  LabelTextUI,
  FieldActionsUI,
  FieldButtonUI,
} from './styles/EditableField.css'
import { COMPONENT_KEY } from './EditableField.utils'
import EditableFieldInput from './EditableFieldInput'
import { key } from '../../constants/Keys'

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
    const idx = Number(name.split('_')[1])

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

  handleInputBlur = () => {
    const { value, initialValue } = this.state

    if (value !== initialValue) {
      this.setState({
        initialValue: value,
      })
    }
  }

  addInput = () => {
    const { value } = this.state

    if (value[value.length - 1] !== '') {
      this.setState({
        value: value.concat(''),
      })
    }
  }

  renderInputFields() {
    const { name, type } = this.props
    const { value } = this.state

    if (Array.isArray(value)) {
      return (
        <div>
          {value.map((val, idx) => (
            <EditableFieldInput
              name={`${name}_${idx}`}
              key={`${name}_${idx}`}
              type={type}
              value={val}
              onBlur={this.handleInputBlur}
              onChange={this.handleInputChange}
              onKeyDown={this.handleInputKeyDown}
            />
          ))}
          <button type="button" onClick={this.addInput}>
            +
          </button>
        </div>
      )
    }
    return (
      <EditableFieldInput
        name={`${name}_0`}
        type={type}
        value={value}
        onBlur={this.handleInputBlur}
        onChange={this.handleInputChange}
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
