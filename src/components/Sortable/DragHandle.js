import React from 'react'
import PropTypes from 'prop-types'
import { SortableHandle } from 'react-sortable-hoc'
import Icon from '../Icon'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export const propTypes = {
  onDragStart: PropTypes.func,
}

const defaultProps = {
  onDragStart: noop,
}

const DragHandle = SortableHandle(props => {
  const { className, onDragStart, onDragEnd, ...rest } = props

  const componentClassName = classNames('c-SortableDragHandle', className)

  return (
    <div className={componentClassName} onMouseDown={onDragStart} {...rest}>
      <Icon name="drag" size="14" ignoreClick={false} />
    </div>
  )
})

DragHandle.propTypes = propTypes
DragHandle.defaultProps = defaultProps

export default DragHandle
