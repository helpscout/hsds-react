import * as React from 'react'
import { SortableElement } from 'react-sortable-hoc'
import DragHandle from './Sortable.DragHandle'
import { classNames } from '../../utilities/classNames'

// export interface SortableItemProps {
//   classNames: string,
//   hideDragHandles: boolean,
//   useDragHandle: boolean,
// }

const Item = SortableElement(props => {
  const {
    className,
    children,
    hideDragHandles,
    sortable,
    useDragHandle,
    ...rest
  } = props

  const componentClassName = classNames('c-SortableItem', className)

  const dragHandleMarkup =
    useDragHandle && !hideDragHandles ? <DragHandle /> : null

  return (
    <div className={componentClassName} {...rest}>
      {dragHandleMarkup}
      {children}
    </div>
  )
})

export default Item
