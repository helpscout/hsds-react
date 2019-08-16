import * as React from 'react'
import { AccordionUI } from './styles/MessageList.css'
import MessageRow from '../MessageRow/'
import { SortableContainer } from 'react-sortable-hoc'

export interface Props {
  items: Array
  onSortEnd: () => {}
  onSortStart: () => {}
}

const SortableList = SortableContainer(({ children }) => {
  return <div>{children}</div>
})

export class MessageList extends React.Component<Props> {
  static defaultProps = {
    items: [],
    onSortEnd: () => {},
    onSortStart: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      isDragging: false,
    }
  }

  onSortEnd = ({ oldIndex, newIndex, collection, isKeySorting }, event) => {
    const isDragging = false
    this.setState({
      index: -1,
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

  onSortStart = ({ node, index, collection, isKeySorting }, event) => {
    const isDragging = true
    this.setState({
      index,
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
        useDragHandle={true}
      >
        <AccordionUI>
          {items.map((item, index) => {
            return (
              <MessageRow
                {...item}
                index={index}
                isError={item.valid === false}
                isPaused={
                  item.status === 'not-started' || item.status === 'paused'
                }
                isDragging={this.state.index === index}
                isDraggingOnList={this.state.isDragging}
                key={`item-${item.id}`}
                sortIndex={index}
              />
            )
          })}
        </AccordionUI>
      </SortableList>
    )
  }
}

export default MessageList
