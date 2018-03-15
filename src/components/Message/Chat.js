import React from 'react'
import PropTypes from 'prop-types'
import Bubble from './Bubble'
import Caption from './Caption'
import ChatBlock from './ChatBlock'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { bubbleTypes } from './propTypes'

export const propTypes = {
  ...bubbleTypes,
  bubbleClassName: PropTypes.string,
  caption: PropTypes.string,
  onBubbleClick: PropTypes.func
}

const defaultProps = {
  onBubbleClick: noop
}

const Chat = props => {
  const {
    body,
    bubbleClassName,
    caption,
    children,
    className,
    read,
    from,
    icon,
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
    icon,
    ltr,
    rtl,
    timestamp,
    to,
    type
  }

  const captionMarkup = caption ? (
    <Caption>{caption}</Caption>
  ) : null

  return (
    <ChatBlock
      className={componentClassName}
      read={read}
      {...chatProps}
      {...rest}
    >
      <Bubble
        {...chatProps}
        className={bubbleClassName}
        onClick={onBubbleClick}
        isNote={isNote}
        primary={primary}
        size={size}
        title={title}
        typing={typing}
        type={type}
      />
      {captionMarkup}
    </ChatBlock>
  )
}

Chat.propTypes = propTypes
Chat.defaultProps = defaultProps

export default Chat
