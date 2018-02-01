import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { statusTypes } from '../../constants/propTypes'

export const propTypes = {
  className: PropTypes.string,
  count: PropTypes.bool,
  display: PropTypes.oneOf(['block', 'inlineBlock']),
  size: PropTypes.string,
  status: statusTypes,
  isSquare: PropTypes.bool,
  white: PropTypes.bool
}

const defaultProps = {
  display: 'inlineBlock'
}

const Badge = props => {
  const {
    children,
    count,
    className,
    display,
    isSquare,
    size,
    status,
    white,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Badge',
    count && 'is-count',
    display && `is-display-${display}`,
    isSquare && `is-square`,
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
Badge.defaultProps = defaultProps
Badge.displayName = 'Badge'

export default Badge
