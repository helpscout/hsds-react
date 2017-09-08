import React from 'react'
import classNames from '../../utilities/classNames'
import { standardSizeTypes } from '../../constants/propTypes'
import { staticAlignTypes } from './propTypes'

export const propTypes = {
  align: staticAlignTypes,
  size: standardSizeTypes
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
