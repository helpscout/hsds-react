import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import BlankSlate from './ChatList.BlankSlate'
import Item from './ChatList.Item'
import { ChatListUI } from './styles/ChatList.css'
import { COMPONENT_KEY } from './ChatList.utils'

type Props = {
  className?: string
  children?: any
}

class ChatList extends React.Component<Props> {
  static BlankSlate = BlankSlate
  static Item = Item

  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-ChatList', className)

    const contentMarkup = React.Children.count(children) ? (
      children
    ) : (
      <BlankSlate />
    )

    return (
      <ChatListUI {...getValidProps(rest)} className={componentClassName}>
        {contentMarkup}
      </ChatListUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.ChatList)(ChatList)

export default ChatList
