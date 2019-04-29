import * as React from 'react'
import Item from './DetailList.Item'
import Title from './DetailList.Title'
import { classNames } from '../../utilities/classNames'

const DetailList = props => {
  const { children, className, ...rest } = props

  const componentClassName = classNames('c-DetailList', className)

  return (
    <dl className={componentClassName} {...rest}>
      {children}
    </dl>
  )
}

DetailList.Item = Item
DetailList.Title = Title
DetailList.displayName = 'DetailList'

export default DetailList
