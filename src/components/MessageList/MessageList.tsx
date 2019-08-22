import * as React from 'react'
import { AccordionUI } from './styles/MessageList.css'
import MessageRow from './MessageRow'
import { SortableContainer } from 'react-sortable-hoc'

export interface Props {
  items: Array<any>
  onSortEnd: (any) => {}
  onSortStart: (any) => {}
}

export interface State {
  indexOfDraggedItem: number
  isDragging: boolean
}

/* istanbul ignore next */
const SortableList = SortableContainer(({ children }) => {
  return <div>{children}</div>
})

/* istanbul ignore next */
export class MessageList extends React.Component<Props, State> {
  static defaultProps = {
    items: [],
    onSortEnd: () => {},
    onSortStart: () => {},
  }

  state = {
    indexOfDraggedItem: -1,
    isDragging: false,
  }

  onSortEnd = ({ oldIndex, newIndex, collection, isKeySorting }) => {
    const isDragging = false
    this.setState({
      indexOfDraggedItem: -1,
      isDragging,
    })

    this.props.onSortEnd({
      collection,
      isDragging,
      isKeySorting,
      newIndex,
      oldIndex,
    })
  }

  onSortStart = ({ node, index, collection, isKeySorting }) => {
    const isDragging = true
    this.setState({
      indexOfDraggedItem: index,
      isDragging,
    })

    this.props.onSortStart({
      collection,
      index,
      node,
      isDragging,
      isKeySorting,
    })
  }

  render() {
    const { items } = this.props

    if (!items.length) return null

    return (
      <SortableList
        lockAxis="y"
        items={items}
        onSortStart={this.onSortStart}
        onSortEnd={this.onSortEnd}
        lockOffset={10}
        lockToContainerEdges={true}
        useDragHandle={true}
      >
        <AccordionUI>
          {items.map((item, index) => (
            <MessageRow
              {...item}
              index={index}
              isDragging={this.state.indexOfDraggedItem === index}
              isDraggingOnList={this.state.isDragging}
              key={`item-${item.id}`}
              sortIndex={index}
            />
          ))}
        </AccordionUI>
      </SortableList>
    )
  }
}

export default MessageList
