import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { stateTypes } from '../../constants/propTypes'

export const propTypes = {
  checkbox: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  state: stateTypes,
}

const Backdrop = props => {
  const { className, checkbox, disabled, readOnly, state, ...rest } = props

  const componentClassName = classNames(
    'c-InputBackdrop',
    checkbox && 'is-checkbox',
    disabled && 'is-disabled',
    readOnly && 'is-readonly',
    state && `is-${state}`,
    className
  )

  return <div className={componentClassName} role="presentation" {...rest} />
}

Backdrop.propTypes = propTypes

export default Backdrop
