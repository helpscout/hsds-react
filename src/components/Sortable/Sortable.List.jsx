import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { SortableContainer } from 'react-sortable-hoc'
import classNames from 'classnames'

const SortableList = SortableContainer(props => {
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
    <div {...getValidProps(rest)} className={componentClassName}>
      {itemsMarkup}
    </div>
  )
})

export default SortableList
