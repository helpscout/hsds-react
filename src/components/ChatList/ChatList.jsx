import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import classNames from 'classnames'
import BlankSlate from './ChatList.BlankSlate'
import Item from './ChatList.Item'
import { ChatListUI } from './ChatList.css'

class ChatList extends React.Component {
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

ChatList.defaultProps = {
  'data-cy': 'ChatList',
}

ChatList.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default ChatList
