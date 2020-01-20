import * as React from 'react'
import { classNames } from '../../utilities/classNames'

import { DetailListItemUI } from './DetailList.css'

const Item = props => {
  const { children, className, ...rest } = props

  const componentClassName = classNames('c-DetailListItem', className)

  return (
    <DetailListItemUI className={componentClassName} {...rest}>
      {children}
    </DetailListItemUI>
  )
}

Item.displayName = 'DetailListItem'

export default Item
