import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

export const propTypes = {
  align: PropTypes.string,
  size: PropTypes.string
}

const Static = props => {
  const {
    align,
    className,
    children,
    size,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-InputStatic',
    align && 'is-block',
    align && `is-${align}`,
    size && `is-${size}`,
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

Static.propTypes = propTypes

export default Static
