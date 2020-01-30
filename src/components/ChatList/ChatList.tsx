import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import BlankSlate from './ChatList.BlankSlate'
import Item from './ChatList.Item'
import { ChatListUI } from './ChatList.css'

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

export default ChatList
