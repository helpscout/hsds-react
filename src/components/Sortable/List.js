import React from 'react'
import PropTypes from 'prop-types'
import { SortableContainer } from 'react-sortable-hoc'
import classNames from '../../utilities/classNames.ts'
import { listTypes } from './propTypes'

export const propTypes = Object.assign({}, listTypes, {
  items: PropTypes.array,
})

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

List.propTypes = propTypes

export default List
