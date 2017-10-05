import React from 'react'
import PropTypes from 'prop-types'
import Block from './Block'
import Item from './Item'
import classNames from '../../utilities/classNames'
import { alignTypes, gapTypes, justTypes } from './propTypes'

export const propTypes = {
  align: alignTypes,
  className: PropTypes.string,
  gap: gapTypes,
  just: justTypes
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
    'c-Flexy',
    align && `is-${align}`,
    gap && `c-Flexy--gap-${gap}`,
    just && `c-Flexy--just-${just}`,
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
