import * as React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import { classNames } from '../../utilities/classNames'

const List = SortableContainer(props => {
  const {
    className,
    dragHandle: useDragHandle,
    hideDragHandles,
    items,
    sortable,
    ...rest
  } = props

  const componentClassName = classNames('c-SortableList', className)

  const itemsMarkup = items
    ? items.map((item, index) => {
        const { index: itemIndex, ...itemRest } = item.props

        return React.cloneElement(item, {
          index,
          useDragHandle,
          hideDragHandles,
          ...itemRest,
        })
      })
    : null

  return (
    <div className={componentClassName} {...rest}>
      {itemsMarkup}
    </div>
  )
})

export default List
