import React from 'react'
import PropTypes from 'prop-types'
import { SortableHandle } from 'react-sortable-hoc'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Icon from '../Icon'
import classNames from 'classnames'
import { DragHandleUI } from './Sortable.css'

const SortableDragHandle = SortableHandle(props => {
  const { className, iconSize, onDragStart, ...rest } = props

  const componentClassName = classNames('c-SortableDragHandle', className)

  return (
    <DragHandleUI
      {...getValidProps(rest)}
      className={componentClassName}
      onMouseDown={onDragStart}
    >
      <Icon name="small-drag-handle" size={iconSize} ignoreClick={false} />
    </DragHandleUI>
  )
})

function noop() {}

SortableDragHandle.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  onDragStart: PropTypes.func,
}

SortableDragHandle.defaultProps = {
  'data-cy': 'SortableDragHandle',
  iconSize: '20',
  onDragStart: noop,
}

export default SortableDragHandle
