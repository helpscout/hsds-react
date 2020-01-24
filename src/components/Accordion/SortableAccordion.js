import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

import Accordion from './Accordion'

const SortableList = SortableContainer(({ children }) => {
  return <div>{children}</div>
})

const SortableItem = SortableElement(({ index, isDragging, children }) => {
  return <div isDragging={isDragging}>{children}</div>
})

export class SortableAccordion extends React.Component {
  render() {
    const { children, ...props } = this.props

    return <Accordion {...props} />
  }
}
