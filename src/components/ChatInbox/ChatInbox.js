import React from 'react'
// import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import Header from './Header'
import Content from './Content'

const ChatInbox = props => {
  const {
    className,
    children,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-ChatInbox',
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

ChatInbox.displayName = 'ChatInbox'
ChatInbox.Header = Header
ChatInbox.Content = Content

export default ChatInbox
