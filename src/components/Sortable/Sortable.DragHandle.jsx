import React from 'react'
import PropTypes from 'prop-types'
import { SortableHandle } from 'react-sortable-hoc'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

import { DragHandleUI } from './Sortable.css'

const defaultProps = {
  onDragStart: noop,
}

const DragHandle = SortableHandle(props => {
  const { className, onDragStart, onDragEnd, ...rest } = props

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

DragHandle.defaultProps = defaultProps

export default DragHandle
