// @flow
import React, { Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames.ts'
import { namespaceComponent } from '../../utilities/component.ts'
import BlankSlate from './BlankSlate'
import Item from './Item'
import { ChatListUI } from './styles/ChatList.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  className?: string,
  children?: any,
}

class ChatList extends Component<Props> {
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
