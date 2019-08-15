import * as React from 'react'
import { AccordionUI, HandleUI } from './styles/MessageList.css.ts'
import MessageRow from '../MessageRow/'
import { SortableContainer } from 'react-sortable-hoc'

export interface Props {
  items: Array
  onSortEnd: function
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

    console.log(this.state)

    return (
      <SortableList
        lockAxis="y"
        // axis="y"
        // helperClass="sortableHelper"
        // lockAxis="y"
        items={items}
        onSortStart={({ node, index, collection, isKeySorting }, event) => {
          this.setState({
            isDragging: true,
          })
        }}
        onSortEnd={(
          { oldIndex, newIndex, collection, isKeySorting },
          event
        ) => {
          this.setState({
            isDragging: false,
          })
        }}
        lockOffset={0}
        // hideSortableGhost={false}
        lockToContainerEdges={true}
        // useDragHandle={true}
        useDragHandle={true}
      >
        <AccordionUI>
          {items.map((item, index) => (
            <MessageRow
              key={`item-${index}`}
              index={index}
              isDragging={this.state.isDragging}
              sortIndex={index}
              message={item}
            />
          ))}
        </AccordionUI>
      </SortableList>
    )
  }
}

export default MessageList
