import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export const propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
}

const defaultProps = {
  onClick: noop
}

const Overlay = props => {
  const {
    children,
    className,
    onClick,
    ...rest
  } = props

  const componentClassName = classNames('c-Overlay', className)

  return (
    <div className={componentClassName} role='dialog' onClick={onClick} {...rest}>
      {children}
    </div>
  )
}

Overlay.propTypes = propTypes
Overlay.defaultProps = defaultProps

export default Overlay
