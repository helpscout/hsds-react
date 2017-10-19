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
    ...rest
  } = props

  const componentClassName = classNames(
    'c-MessageChat',
    className
  )

  return (
    <ChatBlock
      className={componentClassName}
      from={from}
      ltr={ltr}
      read={read}
      rtl={rtl}
      timestamp={timestamp}
      to={to}
      {...rest}
    >
      <Bubble
        from={from}
        isNote={isNote}
        ltr={ltr}
        primary={primary}
        rtl={rtl}
        size={size}
        title={title}
        to={to}
        typing={typing}
      >
        {children}
      </Bubble>
    </ChatBlock>
  )
}

Chat.propTypes = propTypes

export default Chat
