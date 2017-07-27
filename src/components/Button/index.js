import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

const propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.string,
  state: PropTypes.string,
  type: PropTypes.string
}
const defaultProps = {
  disabled: false,
  onClick: () => {},
  size: '',
  state: '',
  type: ''
}

const Button = props => {
  const { disabled, onClick, size, state, type } = props

  const className = classNames(
    'c-Button',
    size && `c-Button--${size}`,
    state && `is-${state}`,
    type && `c-Button--${type}`,
    props.className
  )

  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {props.children}
    </button>
  )
}

Button.propTypes = propTypes
Button.defaultProps = defaultProps

export default Button
