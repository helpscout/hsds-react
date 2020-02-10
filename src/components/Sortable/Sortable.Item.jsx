import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { SortableElement } from 'react-sortable-hoc'
import DragHandle from './Sortable.DragHandle'
import { classNames } from '../../utilities/classNames'

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
    <div {...getValidProps(rest)} className={componentClassName}>
      {dragHandleMarkup}
      {children}
    </div>
  )
})

Item.defaultProps = {
  index: 0,
}

export default Item
