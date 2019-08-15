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
        // lockOffset={10}
        // hideSortableGhost={false}
        // lockToContainerEdges={true}
        // useDragHandle={true}
        useDragHandle={true}
        onSortEnd={this.onSortEnd}
      >
        <AccordionUI>
          {items.map((item, index) => (
            <MessageRow
              key={`item-${index}`}
              index={index}
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
