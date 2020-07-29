import React from 'react'
import PropTypes from 'prop-types'
import { key } from '../../constants/Keys'
import InputBackdropV2 from '../Input/Input.BackdropV2'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import {
  InputUI,
  InputInputUI,
  InputIconUI,
  InputPlaceholderUI,
  InputRadioUI,
} from './Choice.css'

class ChoiceInput extends React.PureComponent {
  state = {
    isFocused: false,
  }

  handleOnBlur = event => {
    this.setState({
      isFocused: false,
    })
    this.props.onBlur(event)
  }

  handleOnChange = event => {
    const { id, onChange, value } = this.props

    onChange(value, event.target.checked, id)
    // Prevents duplicate firing of onChange event
    event.stopPropagation()
  }

  handleOnKeyDown = event => {
    const isEnter = event.key === key.ENTER

    if (isEnter) {
      const { id, onEnter, value } = this.props
      onEnter(value, !event.target.checked, id)
    }
  }

  handleOnFocus = event => {
    this.setState({
      isFocused: true,
    })
    this.props.onFocus(event)
  }

  getIconMarkup = () => {
    const { checked, kind, type } = this.props
    const isRadio = type === 'radio'
    const isCustomRadio = kind === 'custom' && isRadio

    let iconMarkup

    if (isCustomRadio) {
      iconMarkup = checked ? (
        <Icon name="tick-small" size="24" />
      ) : (
        <InputPlaceholderUI className="c-ChoiceInput__placeholder" />
      )
    } else {
      const iconTypeMarkup = isRadio ? (
        <InputRadioUI className="c-ChoiceInput__radio" />
      ) : (
        <Icon name="tick-small" size="20" />
      )

      iconMarkup = checked && iconTypeMarkup
    }

    return (
      <InputIconUI className="c-ChoiceInput__icon">{iconMarkup}</InputIconUI>
    )
  }

  setRef = node => {
    this.props.inputRef(node)

    if (this.props.innerRef) {
      this.props.innerRef(node)
    }
  }

  render() {
    const {
      align,
      autoFocus,
      className,
      checked,
      disabled,
      helpText,
      id,
      kind,
      readOnly,
      name,
      state,
      type,
      value,
      'data-cy': dataCy,
    } = this.props
    const { isFocused } = this.state

    const componentClassName = classNames(
      'c-ChoiceInput',
      align && `is-${align}`,
      disabled && 'is-disabled',
      isFocused && 'is-focused',
      kind && `is-${kind}`,
      readOnly && 'is-readonly',
      state && `is-${state}`,
      type && `is-${type}`,
      className
    )
    const inputClassName = classNames(
      'c-InputField',
      'c-ChoiceInput__input',
      type && `is-${type}`
    )
    const isCustomRadio = kind === 'custom'
    const iconMarkup = this.getIconMarkup()

    return (
      <InputUI className={componentClassName}>
        <InputInputUI
          autoFocus={autoFocus}
          aria-describedby={helpText || undefined}
          aria-invalid={state !== 'error'}
          checked={checked}
          className={inputClassName}
          disabled={disabled}
          id={id}
          ref={this.setRef}
          name={name}
          onBlur={this.handleOnBlur}
          onChange={this.handleOnChange}
          onFocus={this.handleOnFocus}
          onKeyDown={this.handleOnKeyDown}
          readOnly={readOnly}
          type={type}
          value={value}
          data-cy={dataCy}
        />
        <InputBackdropV2
          choiceKind={type}
          disabled={disabled}
          kind={kind}
          isFilled={checked}
          isFirst={false}
          isFocused={isFocused}
          isNotOnly={false}
          isLast={false}
          isSeamless={false}
          readOnly={readOnly}
          state={state}
          showFocus={!isCustomRadio}
        />
        {iconMarkup}
      </InputUI>
    )
  }
}

ChoiceInput.defaultProps = {
  autoFocus: false,
  'data-cy': 'ChoiceInput',
  disabled: false,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  onEnter: noop,
  inputRef: noop,
  innerRef: noop,
  readOnly: false,
  type: 'checkbox',
  value: '',
}

ChoiceInput.propTypes = {
  autoFocus: PropTypes.bool,
  align: PropTypes.string,
  checked: PropTypes.bool,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  id: PropTypes.string,
  inputRef: PropTypes.func,
  innerRef: PropTypes.func,
  /** Render a customized radio or a default */
  kind: PropTypes.oneOf(['default', 'custom']),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  /** Callback when pressing enter whenthe input is focused. */
  onEnter: PropTypes.func,
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  state: PropTypes.string,
  type: PropTypes.oneOf(['checkbox', 'radio']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default ChoiceInput
