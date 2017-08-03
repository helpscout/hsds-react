import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

const propTypes = {
  accessibilityLabel: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  plain: PropTypes.bool,
  primary: PropTypes.bool,
  size: PropTypes.string,
  state: PropTypes.string,
  submit: PropTypes.bool
}
const defaultProps = {
  accessibilityLabel: '',
  disabled: false,
  onBlur: noop,
  onClick: noop,
  onFocus: noop,
  plain: false,
  primary: false,
  size: '',
  state: '',
  submit: false
}

const Button = props => {
  const {
    accessibilityLabel,
    children,
    className,
    disabled,
    onBlur,
    onClick,
    onFocus,
    plain,
    primary,
    size,
    state,
    submit,
    ...rest
  } = props

  const buttonClassName = classNames(
    'c-Button',
    size && `c-Button--${size}`,
    state && `is-${state}`,
    plain && 'c-Button--link',
    primary && 'c-Button--primary',
    props.className
  )

  const type = submit ? 'submit' : 'button'

  return (
    <button
      aria-label={accessibilityLabel}
      className={buttonClassName}
      disabled={disabled}
      onBlur={onBlur}
      onClick={onClick}
      onFocus={onFocus}
      type={type}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.propTypes = propTypes
Button.defaultProps = defaultProps

export default Button
