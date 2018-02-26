import React from 'react'
import Bubble from './Bubble'
import ChatBlock from './ChatBlock'
import classNames from '../../utilities/classNames'
import { bubbleTypes } from './propTypes'

export const propTypes = bubbleTypes

const Chat = props => {
  const {
    children,
    className,
    read,
    from,
    isNote,
    ltr,
    primary,
    rtl,
    size,
    timestamp,
    title,
    to,
    typing,
    type,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-MessageChat',
    className
  )

  const chatProps = {
    from,
    ltr,
    rtl,
    timestamp,
    to,
    type
  }

  return (
    <ChatBlock
      className={componentClassName}
      read={read}
      {...chatProps}
      {...rest}
    >
      <Bubble
        {...chatProps}
        isNote={isNote}
        primary={primary}
        size={size}
        title={title}
        typing={typing}
        type={type}
      >
        {children}
      </Bubble>
    </ChatBlock>
  )
}

Chat.propTypes = propTypes

export default Chat
