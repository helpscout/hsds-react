import React from 'react'
import {SortableHandle} from 'react-sortable-hoc'
import Icon from '../Icon'
import classNames from '../../utilities/classNames'

const DragHandle = SortableHandle((props) => {
  const {
    className,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-SortableDragHandle',
    className
  )
  return (
    <div className={componentClassName} {...rest}>
      <Icon name='drag' size='14' ignoreClick={false} />
    </div>
  )
})

export default DragHandle
