import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

const propTypes = {
  checkbox: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  state: PropTypes.string
}

const Backdrop = props => {
  const {
    checkbox,
    disabled,
    readOnly,
    state
  } = props

  const className = classNames(
    'c-InputBackdrop',
    checkbox && 'is-checkbox',
    disabled && 'is-disabled',
    readOnly && 'is-readonly',
    state && `is-${state}`,
    props.className
  )

  return (
    <div className={className} role='presentation' />
  )
}

Backdrop.propTypes = propTypes

export default Backdrop
