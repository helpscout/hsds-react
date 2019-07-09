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
import * as equal from 'fast-deep-equal'

import {
  EditableFieldProps,
  EditableFieldState,
  FieldValue,
} from './EditableField.types'

const nextUuid = createUniqueIDFactory('EditableField')
const createNewFieldValue = createNewValueFieldFactory(nextUuid)

export class EditableField extends React.PureComponent<
  EditableFieldProps,
  EditableFieldState
> {
  static className = 'c-EditableField'
  static defaultProps = {
    type: 'text',
    disabled: false,
    value: '',
    multipleValues: false,
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

    let defaultStateOption = null

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
      activeField: name,
    })

    onInputFocus({ name, value: fieldValue, event })
  }

  handleInputBlur = ({ name, event }) => {
    const { onInputBlur } = this.props

    return new Promise(resolve => {
      const cachedEvent = { ...event }

      this.setState(
        {
          activeField: '',
        },
        () => {
          resolve()

          onInputBlur({
            name,
            value: this.state.fieldValue,
            event: cachedEvent,
          })
        }
      )
    })
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
      const { initialFieldValue, fieldValue, defaultOption } = this.state
      const { key: eventKey } = event
      const isEnter = eventKey === key.ENTER
      const isEscape = eventKey === key.ESCAPE
      let newFieldValue = initialFieldValue
      let newInitialFieldValue = initialFieldValue

      if (isEnter) {
        if (!event.currentTarget.value) {
          const filteredValues = fieldValue.filter(val => Boolean(val.value))

          newFieldValue =
            filteredValues.length > 0
              ? /* istanbul ignore next */
                filteredValues
              : [
                  createNewFieldValue(
                    {
                      value: '',
                      name,
                    },
                    defaultOption
                  ),
                ]
        } else {
          newFieldValue = this.assignInputValueToFieldValue({
            inputValue: event.currentTarget.value,
            name,
          })
        }
        newInitialFieldValue = newFieldValue
      }

      const newState: any = {
        fieldValue: newFieldValue,
        initialFieldValue: newInitialFieldValue,
        activeField: '',
      }

      this.setState(newState, () => {
        resolve()

        if (isEnter) {
          onEnter({ name, value: newFieldValue, event })
          onCommit({ name, value: newFieldValue })
        }

        if (isEscape) {
          onEscape({ name, value: initialFieldValue, event })
          onDiscard({ value: initialFieldValue })
        }
      })
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
      this.setState({ fieldValue: newFieldValue })
    }

    onOptionChange({ name, selection, value: newFieldValue })
    onChange({ name, value: newFieldValue })
    onCommit({ name, value: this.state.fieldValue })
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
    const { name: propsName, onCommit, onDelete } = this.props
    const { fieldValue, defaultOption } = this.state
    const e = { ...event }

    const filteredFieldValue = fieldValue.filter(val => val.id !== name)
    let newState: any = {}

    newState.fieldValue =
      filteredFieldValue.length > 0
        ? filteredFieldValue
        : [
            createNewFieldValue(
              {
                value: '',
                name: propsName,
              },
              defaultOption
            ),
          ]

    this.setState(newState, () => {
      if (action.callback && typeof action.callback === 'function') {
        action.callback({ name, action, value: fieldValue, event: e })
      }
    })

    onDelete({ name, value: newState.fieldValue, event })
    onCommit({ name, value: newState.fieldValue })
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
      const { fieldValue, initialFieldValue, defaultOption } = this.state

      let newFieldValue: FieldValue[] = []
      let emptyFound: boolean = false

      for (const val of fieldValue) {
        /* istanbul ignore if */
        if (Boolean(val.value)) {
          newFieldValue.push(val)
        } else {
          emptyFound = true
        }
      }

      this.setState(
        {
          activeField: '',
          fieldValue:
            newFieldValue.length > 0
              ? /* istanbul ignore next */
                newFieldValue
              : [
                  createNewFieldValue(
                    {
                      value: '',
                      name,
                    },
                    defaultOption
                  ),
                ],
        },
        () => {
          if (emptyFound) {
            this.props.onDiscard({ value: this.state.fieldValue })
          } else if (!equal(initialFieldValue, this.state.fieldValue)) {
            /* istanbul ignore next */
            this.props.onCommit({ name, value: this.state.fieldValue })
          }
        }
      )
    }
  }

  renderInputFields() {
    const { name, disabled, type, ...rest } = this.props
    const {
      actions,
      activeField,
      fieldValue,
      multipleValuesEnabled,
      valueOptions,
    } = this.state

    return (
      <div className="EditableField__main">
        {fieldValue.map(val => {
          return (
            <EditableFieldInput
              {...getValidProps(rest)}
              actions={actions}
              name={val.id}
              disabled={disabled}
              isActive={activeField === val.id}
              key={val.id}
              type={type}
              fieldValue={val}
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
            <Icon name={ACTION_ICONS['plus']} size="18" />
          </AddButtonUI>
        ) : null}
      </div>
    )
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
        <label className="EditableField__label" htmlFor={fieldValue[0].id}>
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
