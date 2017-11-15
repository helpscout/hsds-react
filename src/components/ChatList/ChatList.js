import React from 'react'
// import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import BlankSlate from './BlankSlate'
import Item from './Item'

const ChatList = props => {
  const {
    className,
    children,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-ChatList',
    className
  )

  const contentMarkup = React.Children.count(children)
    ? children
    : (<BlankSlate />)

  return (
    <div className={componentClassName} {...rest}>
      {contentMarkup}
    </div>
  )
}

ChatList.displayName = 'ChatList'
ChatList.BlankSlate = BlankSlate
ChatList.Item = Item

export default ChatList
