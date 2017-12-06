import React from 'react'
import classNames from '../../utilities/classNames'
import Item from './Item'
import { sizeTypes } from './propTypes'

export const propTypes = {
  size: sizeTypes
}

const defaultProps = {
  size: 'sm'
}

const Inline = props => {
  const {
    className,
    children,
    size,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Inline',
    size && `is-${size}`,
    className
  )

  return (
    <div className={componentClassName} {...rest} role='list'>
      {children}
    </div>
  )
}

Inline.propTypes = propTypes
Inline.defaultProps = defaultProps
Inline.displayName = 'Inline'
Inline.Item = Item

export default Inline
