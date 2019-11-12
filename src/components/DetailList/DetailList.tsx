import * as React from 'react'
import Item from './DetailList.Item'
import Title from './DetailList.Title'
import { classNames } from '../../utilities/classNames'

import { DetailListUI } from './styles/DetailList.css'

const DetailList = props => {
  const { children, className, ...rest } = props

  const componentClassName = classNames('c-DetailList', className)

  return (
    <DetailListUI className={componentClassName} {...rest}>
      {children}
    </DetailListUI>
  )
}

DetailList.Item = Item
DetailList.Title = Title
DetailList.displayName = 'DetailList'

export default DetailList
