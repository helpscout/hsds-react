import React from 'react'
import Item from './Item'
import classNames from '../../utilities/classNames'

const Timeline = props => {
  const { children, className, ...rest } = props

  const componentClassName = classNames('c-Timeline', className)

  return (
    <div className={componentClassName} {...rest} role="list">
      {children}
    </div>
  )
}

Timeline.Item = Item

export default Timeline
