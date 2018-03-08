import React from 'react'
import PropTypes from 'prop-types'
import Bubble from './Bubble'
import ChatBlock from './ChatBlock'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { bubbleTypes } from './propTypes'

export const propTypes = {
  ...bubbleTypes,
  onBubbleClick: PropTypes.func
}

const defaultProps = {
  onBubbleClick: noop
}

const Chat = props => {
  const {
    body,
    children,
    className,
    read,
    from,
    isNote,
    ltr,
    onBubbleClick,
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
    body,
    children,
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
        onClick={onBubbleClick}
        isNote={isNote}
        primary={primary}
        size={size}
        title={title}
        typing={typing}
        type={type}
      />
    </ChatBlock>
  )
}

Chat.propTypes = propTypes
Chat.defaultProps = defaultProps

export default Chat
