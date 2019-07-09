import * as React from 'react'

import {
  EditableFieldInputUI,
  InteractiveContentUI,
  InputUI,
  InputWrapperUI,
  OptionsWrapperUI,
  OptionsDropdownUI,
  TriggerUI,
  StaticContentUI,
  StaticValueUI,
  StaticOptionUI,
  FocusIndicatorUI,
  FieldActionsUI,
  FieldButtonUI,
} from './styles/EditableField.Input.css'

import Dropdown from '../Dropdown/DropdownV2'
import Icon from '../Icon'
import Truncate from '../Truncate'
import Truncated from './EditableField.Truncate'

import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { ACTION_ICONS, COMPONENT_KEY } from './EditableField.utils'
import { classNames } from '../../utilities/classNames'
import { isArray } from '../../utilities/is'
import { key } from '../../constants/Keys'
import { noop } from '../../utilities/other'
import * as equal from 'fast-deep-equal'

import { EditableFieldInputProps, FieldAction } from './EditableField.types'

export class EditableFieldInput extends React.Component<
  EditableFieldInputProps
> {
  static className = 'c-EditableFieldInput'
  static defaultProps = {
    isActive: false,
    fieldValue: '',
    placeholder: '',
    type: 'text',
    innerRef: noop,
    onInputFocus: noop,
    onInputBlur: noop,
    onInputChange: noop,
    onOptionFocus: noop,
    onOptionSelection: noop,
    onChange: noop,
    onKeyDown: noop,
    deleteAction: noop,
    customAction: noop,
  }

  actionsRef: HTMLDivElement
  editableFieldInputRef: HTMLDivElement

  interactiveContentRef: HTMLDivElement
  optionsDropdownRef: HTMLDivElement
  inputRef: HTMLInputElement

  staticContentRef: HTMLDivElement
  staticOptionRef: HTMLSpanElement
  staticValueRef: HTMLSpanElement

  setActionsNode = node => {
    this.actionsRef = node
  }

  setEditableFieldInputNode = node => {
    this.editableFieldInputRef = node
  }

  setInteractiveContentNode = node => {
    this.interactiveContentRef = node
  }

  setOptionsDropdownNode = node => {
    this.optionsDropdownRef = node
  }

  setInputNode = node => {
    this.inputRef = node
  }

  setStaticContentNode = node => {
    this.staticContentRef = node
  }

  setStaticOptionNode = node => {
    this.staticOptionRef = node
  }

  setStaticValueNode = node => {
    this.staticValueRef = node
  }

  componentDidMount() {
    const { isActive } = this.props

    this.calculateFieldWidth()

    if (isActive) {
      const inputNode = this.inputRef

      inputNode && inputNode.focus()
    }
  }

  shouldComponentUpdate(nextProps) {
    if (!equal(this.props.fieldValue, nextProps.fieldValue)) {
      return true
    }

    if (this.props.isActive !== nextProps.isActive) {
      return true
    }

    return false
  }

  componentDidUpdate() {
    this.calculateFieldWidth()
  }

  calculateFieldWidth = () => {
    const { actions, isActive } = this.props
    const editableFieldInputNode = this.editableFieldInputRef
    const staticContentNode = this.staticContentRef
    const staticContentWidth = staticContentNode.getBoundingClientRect().width
    let actionsWidth = 0

    if (actions) {
      actionsWidth = actions.length * 20
    }

    if (isActive) {
      editableFieldInputNode.style.width = '100%'
    } else {
      const initialFieldWidth = editableFieldInputNode.getBoundingClientRect()
        .width

      if (initialFieldWidth > staticContentWidth + actionsWidth) {
        /* istanbul ignore next */
        editableFieldInputNode.style.width = `${staticContentWidth}px`
      } else {
        editableFieldInputNode.style.width = `${staticContentWidth -
          actionsWidth}px`
      }
    }
  }

  getClassName() {
    const { className } = this.props

    return classNames(EditableFieldInput.className, className)
  }

  handleInputFocus = event => {
    const { onInputFocus, name } = this.props

    onInputFocus({ name, event })
  }

  handleInputBlur = event => {
    const { name, onInputBlur } = this.props

    onInputBlur({ name, event }).then(() => {
      const staticValueNode = this.staticValueRef

      staticValueNode && staticValueNode.removeAttribute('tabIndex')
    })
  }

  handleOptionFocus = event => {
    const { onOptionFocus, name } = this.props

    onOptionFocus({ name, event })
  }

  handleChange = event => {
    const { onChange, onInputChange } = this.props

    onChange({
      inputValue: event.currentTarget.value,
      name: this.props.name,
      event,
    })

    if (onInputChange) {
      onInputChange({
        inputValue: event.currentTarget.value,
        name: this.props.name,
        event,
      })
    }
  }

  handleKeyDown = event => {
    const isEnter = event.key === key.ENTER
    const isEscape = event.key === key.ESCAPE
    const isDropdownTrigger = event.target.classList.contains(
      'c-DropdownV2Trigger'
    )

    if ((isEnter && !isDropdownTrigger) || isEscape) {
      const { name, onKeyDown } = this.props

      onKeyDown({ event, name }).then(() => {
        const staticValueNode = this.staticValueRef
        const inputNode = this.inputRef

        // In case the value is longer than the width of the input
        // lets move the cursor to the very beginning
        // when clicking the input the cursor will be at the expected position :)
        if (inputNode && inputNode.setSelectionRange) {
          inputNode.setSelectionRange(0, 0)
        }

        if (staticValueNode) {
          staticValueNode.setAttribute('tabIndex', '0')
          staticValueNode.focus()
        }
      })
    }
  }

  handleActionClick = ({ action, event }) => {
    const { name, fieldValue } = this.props

    if (action.name === 'delete') {
      this.props.deleteAction({ action, name, event })
    }
    if (action.name === 'link') {
      /* istanbul ignore next */
      window && window.open(fieldValue.value)
    } else {
      this.props.customAction({ action, name, event })
    }
  }

  /* istanbul ignore next */
  handleStaticValueKeyDown = event => {
    const inputNode = this.inputRef

    if (event.key === key.ENTER) {
      inputNode && inputNode.focus()
    }
  }

  /* istanbul ignore next */
  handleStaticValueBlur = () => {
    const staticValueNode = this.staticValueRef
    staticValueNode && staticValueNode.removeAttribute('tabIndex')
  }

  renderActions = () => {
    const { actions } = this.props

    return (
      <FieldActionsUI
        className="EditableField__actions"
        innerRef={this.setActionsNode}
        // ts complains about actions possibly being undefined
        // but renderActions is never called if actions is undefined (same below in the mapping)
        // @ts-ignore
        numberOfActions={actions.length}
      >
        {(actions as any).map(action => {
          return (
            <FieldButtonUI
              className={`FieldButton action-${action.name}`}
              key={action.name}
              tabIndex="-1"
              type="button"
              onClick={event => {
                this.handleActionClick({ action, event })
              }}
            >
              <Icon name={action.icon || ACTION_ICONS[action.name]} size="16" />
            </FieldButtonUI>
          )
        })}
      </FieldActionsUI>
    )
  }

  handleDropdownSelect = selection => {
    const { name, onOptionSelection } = this.props

    onOptionSelection({ name, selection })

    this.optionsDropdownRef && this.optionsDropdownRef.focus()
  }

  renderInteractiveOptions = () => {
    const { fieldValue, valueOptions } = this.props

    return (
      <OptionsWrapperUI
        className="EditableField__optionsWrapper"
        onKeyDown={this.handleKeyDown}
      >
        <Dropdown
          className="EditableField__Dropdown"
          items={valueOptions}
          shouldRefocusOnClose={() => false}
          minWidth={75}
          maxWidth={200}
          onBlur={this.handleInputBlur}
          onFocus={this.handleOptionFocus}
          onSelect={this.handleDropdownSelect}
          triggerRef={this.setOptionsDropdownNode}
          renderTrigger={
            <TriggerUI className="EditableField__optionsTrigger">
              <OptionsDropdownUI
                className="EditableField__optionsDropdown"
                title={fieldValue.option}
              >
                <Truncate className="EditableField__selectedOption">
                  {fieldValue.option}
                </Truncate>
                <Icon name={ACTION_ICONS.valueOption} />
              </OptionsDropdownUI>
              <FocusIndicatorUI className="EditableField__focusIndicator" />
            </TriggerUI>
          }
        />
      </OptionsWrapperUI>
    )
  }

  renderStaticOption = () => {
    const { fieldValue } = this.props

    return (
      <StaticOptionUI
        className="EditableField__staticOption"
        innerRef={this.setStaticOptionNode}
      >
        <Truncate>{fieldValue.option}:</Truncate>
      </StaticOptionUI>
    )
  }

  render() {
    const {
      actions,
      name,
      placeholder,
      isActive,
      type,
      fieldValue,
      valueOptions,
      ...rest
    } = this.props

    return (
      <EditableFieldInputUI
        className={classNames(
          this.getClassName(),
          isActive && 'is-active',
          valueOptions && 'has-options',
          !Boolean(fieldValue.value) && 'is-empty'
        )}
        innerRef={this.setEditableFieldInputNode}
      >
        <InteractiveContentUI
          className="EditableField__interactiveContent"
          innerRef={this.setInteractiveContentNode}
        >
          {valueOptions ? this.renderInteractiveOptions() : null}

          <InputWrapperUI className="EditableField__inputWrapper">
            <InputUI
              {...getValidProps(rest)}
              className="EditableField__input"
              id={name}
              innerRef={this.setInputNode}
              name={name}
              placeholder={placeholder}
              type={type}
              value={fieldValue.value}
              onBlur={this.handleInputBlur}
              onChange={this.handleChange}
              onFocus={this.handleInputFocus}
              onKeyDown={this.handleKeyDown}
              title={fieldValue.value}
            />
            <FocusIndicatorUI className="EditableField__focusIndicator" />
          </InputWrapperUI>
        </InteractiveContentUI>

        <StaticContentUI
          className="EditableField__staticContent"
          innerRef={this.setStaticContentNode}
        >
          {valueOptions ? this.renderStaticOption() : null}

          <StaticValueUI
            className="EditableField__staticValue"
            innerRef={this.setStaticValueNode}
            onBlur={this.handleStaticValueBlur}
            onKeyDown={this.handleStaticValueKeyDown}
          >
            {fieldValue.value ? (
              <Truncated
                string={fieldValue.value}
                splitter={type === 'email' ? '@' : undefined}
              />
            ) : (
              <span className="is-placeholder">{placeholder}</span>
            )}
          </StaticValueUI>
        </StaticContentUI>

        {actions && Boolean(fieldValue.value) ? this.renderActions() : null}
      </EditableFieldInputUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(EditableFieldInput)

export default PropConnectedComponent
