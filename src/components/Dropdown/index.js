import React from 'react'
import Divider from './Divider'
import Item from './Item'
import Menu from './Menu'
import classNames from '../../utilities/classNames'

const Dropdown = props => {
  const {
    children,
    className,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Dropdown',
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

Dropdown.Divider = Divider
Dropdown.Item = Item
Dropdown.Menu = Menu

export default Dropdown
