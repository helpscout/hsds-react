import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

export const propTypes = {
  className: PropTypes.string,
  focusable: PropTypes.bool
}

const defaultProps = {
  focusable: false
}

const VisuallyHidden = props => {
  const { children, className, focusable, ...rest } = props

  const componentClassName = classNames(
    'c-VisuallyHidden',
    focusable && 'is-focusable',
    className
  )

  const tabIndex = focusable ? 1 : null

  return (
    <span className={componentClassName} tabIndex={tabIndex} {...rest}>
      {children}
    </span>
  )
}

VisuallyHidden.propTypes = propTypes
VisuallyHidden.defaultProps = defaultProps

export default VisuallyHidden
