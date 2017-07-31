import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

const propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  state: PropTypes.string
}

const Backdrop = props => {
  const {
    disabled,
    state
  } = props

  const className = classNames(
    'c-InputBackdrop',
    disabled && 'is-disabled',
    state && `is-${state}`,
    props.className
  )

  return (
    <div className={className} role='presentation' />
  )
}

Backdrop.propTypes = propTypes

export default Backdrop
