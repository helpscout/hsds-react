import React from 'react'
import PropTypes from 'prop-types'
import Backdrop from '../Input/Backdrop'
import Icon from '../Icon'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

const propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  helpText: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  state: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
}
const defaultProps = {
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  type: 'checkbox'
}

const Input = props => {
  const {
    checked,
    disabled,
    helpText,
    id,
    onBlur,
    onChange,
    onFocus,
    readOnly,
    name,
    state,
    type,
    value
  } = props

  const className = classNames(
    'c-ChoiceInput',
    disabled && `is-disabled`,
    readOnly && `is-readonly`,
    state && `is-${state}`,
    type && `is-${type}`,
    props.className
  )

  const handleOnChange = (event) => {
    const {currentTarget} = event
    onChange(value, currentTarget.checked, id)
  }

  const iconTypeMarkup = type === 'radio' ? (
    <div className='c-ChoiceInput__radio' />
  ) : (
    <Icon name='check' size={12} />
  )

  const iconMarkup = checked ? (
    <div className='c-ChoiceInput__icon'>
      {iconTypeMarkup}
    </div>
  ) : null

  return (
    <div className={className}>
      <input
        autoFocus={checked}
        aria-describedby={helpText || undefined}
        aria-invalid={state !== 'error'}
        checked={checked}
        className={`c-InputField c-ChoiceInput__input is-${type}`}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={handleOnChange}
        onFocus={onFocus}
        readOnly={readOnly}
        type={type}
        value={value}
      />
      <Backdrop checkbox disabled={disabled} readOnly={readOnly} state={state} />
      {iconMarkup}
    </div>
  )
}

Input.propTypes = propTypes
Input.defaultProps = defaultProps

export default Input
