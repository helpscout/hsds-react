import * as React from 'react'
import { SortableHandle } from 'react-sortable-hoc'
import Icon from '../Icon/index'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

const defaultProps = {
  onDragStart: noop,
}

const DragHandle = SortableHandle(props => {
  const { className, onDragStart, onDragEnd, ...rest } = props

  const componentClassName = classNames('c-SortableDragHandle', className)

  return (
    <div className={componentClassName} onMouseDown={onDragStart} {...rest}>
      <Icon name="drag-handle" ignoreClick={false} />
    </div>
  )
})

DragHandle.defaultProps = defaultProps

export default DragHandle
