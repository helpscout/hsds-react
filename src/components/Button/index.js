import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import RouteWrapper from '../RouteWrapper'
import { standardSizeTypes, stateTypes } from '../../constants/propTypes'

export const propTypes = {
  accessibilityLabel: PropTypes.string,
  block: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  isActive: PropTypes.bool,
  plain: PropTypes.bool,
  primary: PropTypes.bool,
  size: standardSizeTypes,
  state: stateTypes,
  submit: PropTypes.bool
}

const defaultProps = {
  accessibilityLabel: '',
  block: false,
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
    block,
    buttonRef,
    children,
    className,
    disabled,
    isActive,
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

  const componentClassName = classNames(
    'c-Button',
    isActive && 'is-selected',
    block && 'c-Button--block',
    size && `c-Button--${size}`,
    state && `is-${state}`,
    plain && 'c-Button--link',
    primary && 'c-Button--primary',
    className
  )

  const type = submit ? 'submit' : 'button'

  return (
    <button
      aria-label={accessibilityLabel}
      ref={buttonRef}
      className={componentClassName}
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

export default RouteWrapper(Button)
