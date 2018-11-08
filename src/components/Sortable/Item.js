import React from 'react'
import PropTypes from 'prop-types'
import { SortableElement } from 'react-sortable-hoc'
import DragHandle from './DragHandle'
import { classNames } from '../../utilities/classNames'

export const propTypes = {
  classNames: PropTypes.string,
  hideDragHandles: PropTypes.bool,
  useDragHandle: PropTypes.bool,
}

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

Item.propTypes = propTypes

export default Item
