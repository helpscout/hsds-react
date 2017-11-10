import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { statusTypes } from '../../constants/propTypes'

export const propTypes = {
  className: PropTypes.string,
  count: PropTypes.bool,
  size: PropTypes.string,
  status: statusTypes,
  white: PropTypes.bool
}

const Badge = props => {
  const {
    children,
    count,
    className,
    size,
    status,
    white,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Badge',
    count && 'is-count',
    size && `is-${size}`,
    status && `is-${status}`,
    white && 'is-white',
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

Badge.propTypes = propTypes

export default Badge
