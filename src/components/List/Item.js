import React from 'react'
import { classNames } from '../../utilities/classNames.ts'

const defaultProps = {
  role: 'listitem',
}

const Item = props => {
  const { children, className, role, ...rest } = props

  const componentClassName = classNames('c-List__item', className)

  return (
    <li className={componentClassName} {...rest} role={role}>
      {children}
    </li>
  )
}

Item.defaultProps = defaultProps

export default Item
