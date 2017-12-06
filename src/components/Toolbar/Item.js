import React from 'react'
import Flexy from '../Flexy'
import classNames from '../../utilities/classNames'

const Item = props => {
  const {
    className,
    children,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-ToolbarItem',
    className
  )

  return (
    <Flexy.Item className={componentClassName} {...rest}>
      {children}
    </Flexy.Item>
  )
}

Item.displayName = 'ToolbarItem'

export default Item
