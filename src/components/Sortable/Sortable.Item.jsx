import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { SortableElement } from 'react-sortable-hoc'
import DragHandle from './Sortable.DragHandle'
import classNames from 'classnames'

const SortableItem = SortableElement(props => {
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

SortableItem.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** If you're using the `SortableHandle` HOC, set this to `true` */
  useDragHandle: PropTypes.bool,
  /** Whether to hide the drag handles or not */
  hideDragHandles: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

SortableItem.defaultProps = {
  'data-cy': 'SortableItem',
}

export default SortableItem
