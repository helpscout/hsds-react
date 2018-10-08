import React from 'react'
import { classNames } from '../../utilities/classNames.ts'

const Item = props => {
  const { children, className, ...rest } = props

  const componentClassName = classNames('c-DetailListItem', className)

  return (
    <dd className={componentClassName} {...rest}>
      {children}
    </dd>
  )
}

Item.displayName = 'DetailListItem'

export default Item
