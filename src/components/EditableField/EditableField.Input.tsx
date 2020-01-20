import * as React from 'react'

import {
  EditableFieldInputUI,
  InputUI,
  InputWrapperUI,
  OptionsWrapperUI,
  OptionsDropdownUI,
  TriggerUI,
  FocusIndicatorUI,
  ValidationIconUI,
} from './EditableField.css'

import Dropdown from '../Dropdown/DropdownV2'
import Icon from '../Icon'
import Tooltip from '../Tooltip'
import Truncate from '../Truncate'

import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { ACTION_ICONS, FIELDTYPES } from './constants'

import {
  findParentByClassName,
  isEllipsisActive,
  getValidationColor,
  EDITABLEFIELD_CLASSNAMES,
  MASK_CLASSNAMES,
  INPUT_CLASSNAMES,
  OTHERCOMPONENTS_CLASSNAMES,
  TRUNCATED_CLASSNAMES,
  STATES_CLASSNAMES,
} from './EditableField.utils'
import { classNames } from '../../utilities/classNames'
import { key } from '../../constants/Keys'
import { noop } from '../../utilities/other'
import * as equal from 'fast-deep-equal'

import { InputProps } from './EditableField.types'

export class EditableFieldInput extends React.Component<InputProps> {
  static className = INPUT_CLASSNAMES.component
  static defaultProps = {
    disabled: false,
    fieldValue: '',
    isActive: false,
    inline: false,
    placeholder: '',
    type: FIELDTYPES.text,
    innerRef: noop,
    onInputFocus: noop,
    onInputBlur: noop,
    onOptionFocus: noop,
    onOptionSelection: noop,
    onOptionBlur: noop,
    onChange: noop,
    onKeyDown: noop,
    onKeyPress: noop,
    onKeyUp: noop,
    deleteAction: noop,
    customAction: noop,
  }

  fieldInputContentRef: HTMLDivElement
  optionsDropdownRef: HTMLDivElement
  inputRef: HTMLInputElement

  setFieldInputContentNode = node => {
    this.fieldInputContentRef = node
  }

  setOptionsDropdownNode = node => {
    this.optionsDropdownRef = node
  }

  setInputNode = node => {
    this.inputRef = node
  }

  componentDidMount() {
    const { isActive } = this.props

    this.setInputTitle()

    if (isActive) {
      /* istanbul ignore next */
      if (document.activeElement !== this.optionsDropdownRef) {
        const inputNode = this.inputRef
        inputNode && inputNode.focus()
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    if (!equal(this.props.fieldValue, nextProps.fieldValue)) {
      return true
    }

    if (this.props.isActive !== nextProps.isActive) {
      return true
    }

    if (this.props.disabled !== nextProps.disabled) {
      return true
    }

    // Below is tested
    /* istanbul ignore next */
    if (!equal(this.props.validationInfo, nextProps.validationInfo)) {
      return true
    }

    return false
  }

  componentDidUpdate() {
    this.setInputTitle()
  }

  /* istanbul ignore next */
  setInputTitle = () => {
    const { fieldValue } = this.props
    const inputNode = this.inputRef
    const parentNode = findParentByClassName(
      inputNode,
      EDITABLEFIELD_CLASSNAMES.field
    )

    if (!parentNode) return

    const contentNode = parentNode.querySelector(
      `.${MASK_CLASSNAMES.value} .${OTHERCOMPONENTS_CLASSNAMES.truncateContent}`
    )
    const firstChunkNode = parentNode.querySelector(
      `.${MASK_CLASSNAMES.value} .${TRUNCATED_CLASSNAMES.firstChunk}`
    )

    if (isEllipsisActive(contentNode) || isEllipsisActive(firstChunkNode)) {
      inputNode && inputNode.setAttribute('title', fieldValue.value)
    }
  }

  handleInputFocus = event => {
    const { name, onInputFocus } = this.props

    onInputFocus({ name, event })
  }

  handleInputBlur = event => {
    const { name, onInputBlur } = this.props
    const optionsNode = this.optionsDropdownRef

    /* istanbul ignore next */
    if (optionsNode && optionsNode.classList.contains('is-open')) return

    onInputBlur({ name, event })
  }

  handleOptionFocus = event => {
    const { disabled, name, onOptionFocus } = this.props
    /* istanbul ignore else */
    if (!disabled) {
      onOptionFocus({ name, event })
    }
  }

  handleChange = event => {
    const { onChange } = this.props

    onChange({
      inputValue: event.currentTarget.value,
      name: this.props.name,
      event,
    })
  }

  /* istanbul ignore next */
  handleKeyDown = event => {
    const isEnter = event.key === key.ENTER
    const isDropdownTrigger = event.target.classList.contains(
      OTHERCOMPONENTS_CLASSNAMES.dropdownTrigger
    )

    if (isEnter && isDropdownTrigger) {
      return
    }

    const { name, onKeyDown } = this.props
    const inputNode = this.inputRef

    onKeyDown({ event, name })
      .then(() => {
        // In case the value is longer than the width of the input
        // lets move the cursor to the very beginning
        // when clicking the input the cursor will be at the expected position :)
        /* istanbul ignore else */
        if (inputNode && inputNode.setSelectionRange) {
          inputNode.setSelectionRange(0, 0)
        }
      })
      .catch(err => {
        // Do nothing
      })
  }

  handleKeyPress = event => {
    const { name, onKeyPress } = this.props
    onKeyPress({ event, name })
  }

  handleKeyUp = event => {
    const { name, onKeyUp } = this.props
    onKeyUp({ event, name })
  }

  handleOptionsBlur = event => {
    const { name, onOptionBlur } = this.props

    onOptionBlur({ name, event })
  }

  handleDropdownSelect = selection => {
    const { name, onOptionSelection } = this.props

    onOptionSelection({ name, selection })
    this.optionsDropdownRef && this.optionsDropdownRef.focus()
  }

  renderOptions = () => {
    const { disabled, fieldValue, valueOptions } = this.props

    return (
      <OptionsWrapperUI
        className={INPUT_CLASSNAMES.optionsWrapper}
        onKeyDown={this.handleKeyDown}
      >
        <Dropdown
          className={INPUT_CLASSNAMES.dropdown}
          items={valueOptions}
          disabled={disabled}
          shouldRefocusOnClose={() => false}
          minWidth={75}
          maxWidth={200}
          onBlur={this.handleOptionsBlur}
          onFocus={this.handleOptionFocus}
          onSelect={this.handleDropdownSelect}
          triggerRef={this.setOptionsDropdownNode}
          renderTrigger={
            <TriggerUI className={INPUT_CLASSNAMES.optionsTrigger}>
              <OptionsDropdownUI className={INPUT_CLASSNAMES.optionsDropdown}>
                <Truncate className={INPUT_CLASSNAMES.selectedOption}>
                  {fieldValue.option}
                </Truncate>
                <Icon name={ACTION_ICONS.valueOption} />
              </OptionsDropdownUI>
              <FocusIndicatorUI className={INPUT_CLASSNAMES.focusIndicator} />
            </TriggerUI>
          }
        />
      </OptionsWrapperUI>
    )
  }

  renderValidationInfo = () => {
    const { name, validationInfo } = this.props

    if (!validationInfo) return null
    if (name !== validationInfo.name) return null

    const DEFAULT_ICON = 'alert-small'

    return (
      <ValidationIconUI
        className={INPUT_CLASSNAMES.validation}
        color={getValidationColor(validationInfo)}
      >
        <Tooltip
          animationDelay={0}
          animationDuration={0}
          display="block"
          placement="top-end"
          title={validationInfo.message}
        >
          <Icon name={validationInfo.icon || DEFAULT_ICON} size={24} />
        </Tooltip>
      </ValidationIconUI>
    )
  }

  render() {
    const {
      disabled,
      fieldValue,
      isActive,
      inline,
      name,
      placeholder,
      type,
      validationInfo,
      valueOptions,
      ...rest
    } = this.props

    return (
      <EditableFieldInputUI
        className={classNames(
          INPUT_CLASSNAMES.content,
          inline && STATES_CLASSNAMES.isInline,
          disabled && STATES_CLASSNAMES.isDisabled,
          validationInfo &&
            name === validationInfo.name &&
            STATES_CLASSNAMES.withValidation
        )}
        ref={this.setFieldInputContentNode}
      >
        {valueOptions ? this.renderOptions() : null}

        <InputWrapperUI
          className={INPUT_CLASSNAMES.inputWrapper}
          placeholder={placeholder}
          value={fieldValue.value}
        >
          <InputUI
            {...getValidProps(rest)}
            className={INPUT_CLASSNAMES.input}
            id={name}
            ref={this.setInputNode}
            name={name}
            placeholder={placeholder}
            type={type === 'password' ? type : 'text'}
            value={fieldValue.value}
            onBlur={this.handleInputBlur}
            onChange={this.handleChange}
            onFocus={this.handleInputFocus}
            onKeyDown={this.handleKeyDown}
          />

          {this.renderValidationInfo()}

          <FocusIndicatorUI
            className={INPUT_CLASSNAMES.focusIndicator}
            color={getValidationColor(validationInfo)}
          />
        </InputWrapperUI>
      </EditableFieldInputUI>
    )
  }
}

export default EditableFieldInput
