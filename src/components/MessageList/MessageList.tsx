import * as React from 'react'
import { AccordionUI, HandleUI } from './styles/MessageList.css.ts'
import MessageRow from '../MessageRow/'
import { SortableContainer } from 'react-sortable-hoc'

export interface Props {
  items: Array
  onSortEnd: function
  onSortStart: function
}

const showErrorIcon = message => {
  return message.valid === false
}

const SortableList = SortableContainer(({ children, className }) => {
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

  render() {
    const { items } = this.props

    const showErrorIcon = item => {
      return item.valid === false
    }

    if (!items.length) return null

    return (
      <SortableList
        lockAxis="y"
        // axis="y"
        // helperClass="sortableHelper"
        // lockAxis="y"
        items={items}
        onSortStart={({ node, index, collection, isKeySorting }, event) => {
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
        }}
        onSortEnd={(
          { oldIndex, newIndex, collection, isKeySorting },
          event
        ) => {
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
        }}
        lockOffset={0}
        // hideSortableGhost={false}
        lockToContainerEdges={true}
        useDragHandle={true}
        useDragHandle={true}
      >
        <AccordionUI>
          {items.map((item, index) => {
            return (
              <MessageRow
                {...item}
                key={`item-${index}`}
                index={index}
                isDragging={this.state.index === index}
                isDraggingOnList={this.state.isDragging}
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
