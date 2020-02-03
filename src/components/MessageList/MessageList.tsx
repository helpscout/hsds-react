import * as React from 'react'
import { AccordionUI } from './MessageList.css'
import MessageRow from './MessageRow'
import { SortableContainer } from 'react-sortable-hoc'
import { GlobalContext } from '../HSDS/Provider'

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

export const MessageList = props => {
  if (props.items.length === 0) return null
  const [isDragging, setDragging] = React.useState(false)
  const [indexOfDraggedItem, setIndexOfDraggingItem] = React.useState(-1)

  const contextValue: any = React.useContext(GlobalContext)
  const scope = contextValue ? contextValue.getCurrentScope() : null

  const onSortEnd = ({ oldIndex, newIndex, collection, isKeySorting }) => {
    setDragging(false)
    setIndexOfDraggingItem(-1)

    props.onSortEnd({
      collection,
      isDragging,
      isKeySorting,
      newIndex,
      oldIndex,
    })
  }

  const onSortStart = ({ node, index, collection, isKeySorting }) => {
    setDragging(true)
    setIndexOfDraggingItem(index)

    props.onSortStart({
      collection,
      index,
      node,
      isDragging,
      isKeySorting,
    })
  }

  const getContainer = () => {
    if (scope) {
      return document.querySelector(`.${scope}`)
    }

    return document.body
  }

  return (
    <SortableList
      lockAxis="y"
      helperClass="is-dragging"
      items={props.items}
      onSortStart={onSortStart}
      onSortEnd={onSortEnd}
      lockOffset={10}
      lockToContainerEdges={true}
      useDragHandle={true}
      helperContainer={getContainer}
    >
      <AccordionUI>
        {props.items.map((item, index) => (
          <MessageRow
            {...item}
            index={index}
            isDragging={indexOfDraggedItem === index}
            isDraggingOnList={isDragging}
            key={`item-${item.id}`}
            sortIndex={index}
          />
        ))}
      </AccordionUI>
    </SortableList>
  )
}

MessageList.defaultProps = {
  items: [],
  onSortEnd: () => {},
  onSortStart: () => {},
}

export default MessageList
