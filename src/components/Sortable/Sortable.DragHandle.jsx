import React from 'react'
import PropTypes from 'prop-types'
import { SortableHandle } from 'react-sortable-hoc'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

import { DragHandleUI } from './Sortable.css'

const SortableDragHandle = SortableHandle(props => {
  const { className, onDragStart, ...rest } = props

  const componentClassName = classNames('c-SortableDragHandle', className)

  return (
    <DragHandleUI
      {...getValidProps(rest)}
      className={componentClassName}
      onMouseDown={onDragStart}
    >
      <Icon name="drag-handle" ignoreClick={false} />
    </DragHandleUI>
  )
})

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
