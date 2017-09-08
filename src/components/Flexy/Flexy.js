import React from 'react'
import PropTypes from 'prop-types'
import Block from './Block'
import Item from './Item'
import classNames from '../../utilities/classNames'

export const propTypes = {
  align: PropTypes.string,
  className: PropTypes.string,
  gap: PropTypes.string,
  just: PropTypes.string
}

const Flexy = props => {
  const {
    align,
    children,
    className,
    gap,
    just,
    ...rest
  } = props

  const componentClassName = classNames(
    'o-flexy',
    align && `is-${align}`,
    gap && `o-flexy--gap-${gap}`,
    just && `o-flexy--just-${just}`,
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

Flexy.PropTypes = propTypes
Flexy.Block = Block
Flexy.Item = Item

export default Flexy
