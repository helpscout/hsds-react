import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
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
import DropList from '../DropList'
import Icon from '../Icon'
import Tooltip from '../Tooltip'
import Truncate from '../Truncate'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { ACTION_ICONS, FIELDTYPES } from './EditableField.constants'
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
import equal from 'fast-deep-equal'

const Toggler = forwardRef(
  (
    {
      disabled = false,
      isActive = false,
      onBlur = noop,
      onClick = noop,
      onFocus = noop,
      fieldValue,
      ...rest
    },
    ref
  ) => {
    return (
      <TriggerUI
        aria-label="toggle menu"
        aria-haspopup="true"
        aria-expanded={isActive}
        className={INPUT_CLASSNAMES.optionsTrigger}
        data-cy="EditableFieldOptionsTrigger"
        disabled={disabled}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
        type="button"
        {...rest}
      >
        <OptionsDropdownUI
          className={classNames(
            INPUT_CLASSNAMES.optionsDropdown,
            isActive && 'menu-open'
          )}
        >
          <Truncate className={INPUT_CLASSNAMES.selectedOption}>
            {fieldValue.option}
          </Truncate>
          <Icon name={ACTION_ICONS.valueOption} />
        </OptionsDropdownUI>
        <FocusIndicatorUI className={INPUT_CLASSNAMES.focusIndicator} />
      </TriggerUI>
    )
  }
)

export class EditableFieldInput extends React.Component {
  static className = INPUT_CLASSNAMES.component

  fieldInputContentRef
  optionsDropdownRef
  inputRef
  inputWrapperRef = React.createRef()

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

    if (!equal(this.props.validationInfo, nextProps.validationInfo)) {
      return true
    }

    return false
  }

  componentDidUpdate() {
    this.setInputTitle()
  }

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

    if (optionsNode && optionsNode.classList.contains('is-open')) return

    onInputBlur({ name, event })
  }

  handleOptionFocus = event => {
    const { disabled, name, onOptionFocus } = this.props

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
      <OptionsWrapperUI className={INPUT_CLASSNAMES.optionsWrapper}>
        <DropList
          className={INPUT_CLASSNAMES.dropdown}
          items={valueOptions}
          onSelect={this.handleDropdownSelect}
          toggler={
            <Toggler
              disabled={disabled}
              fieldValue={fieldValue}
              onFocus={this.handleOptionFocus}
              onBlur={this.handleOptionsBlur}
            />
          }
          tippyOptions={{
            appendTo: reference =>
              reference.closest('.EditableField__field.has-options'),
            offset: [0, 10],
          }}
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
          appendTo={this.inputWrapperRef.current}
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
          withPlaceholder={placeholder}
          value={fieldValue.value}
          ref={this.inputWrapperRef}
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

EditableFieldInput.defaultProps = {
  'data-cy': 'EditableFieldInput',
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

EditableFieldInput.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  disabled: PropTypes.bool,
  fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  inline: PropTypes.bool,
  isActive: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  type: PropTypes.string,
  validationInfo: PropTypes.object,
  valueOptions: PropTypes.arrayOf(PropTypes.object),
  innerRef: PropTypes.func,
  onInputFocus: PropTypes.func,
  onInputBlur: PropTypes.func,
  onOptionFocus: PropTypes.func,
  onOptionBlur: PropTypes.func,
  onOptionSelection: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  deleteAction: PropTypes.func,
  customAction: PropTypes.func,
}

export default EditableFieldInput
