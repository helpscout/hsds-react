import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import BlankSlate from './ChatList.BlankSlate'
import Item from './ChatList.Item'
import { ChatListUI } from './ChatList.css'

class ChatList extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  }

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
