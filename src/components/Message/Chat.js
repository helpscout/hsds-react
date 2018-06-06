import React from 'react'
import PropTypes from 'prop-types'
import Bubble from './Bubble'
import Caption from './Caption'
import ChatBlock from './ChatBlock'
import Flexy from '../Flexy'
import Spinner from '../Spinner'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { bubbleTypes } from './propTypes'

export const propTypes = {
  ...bubbleTypes,
  bubbleClassName: PropTypes.string,
  captionSize: PropTypes.string,
  caption: PropTypes.string,
  errorMessage: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isLoading: PropTypes.bool,
  onBubbleClick: PropTypes.func,
}

const defaultProps = {
  onBubbleClick: noop,
  error: false,
  errorMessage: "Couldn't send.",
  isLoading: false,
}

const Chat = props => {
  const {
    body,
    bubbleClassName,
    caption,
    captionSize,
    children,
    className,
    error,
    errorMessage,
    read,
    from,
    icon,
    isLoading,
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

  const componentClassName = classNames('c-MessageChat', className)

  const chatProps = {
    body,
    children,
    from,
    icon,
    ltr,
    rtl,
    timestamp,
    to,
    type,
  }

  const captionMarkup = caption ? (
    <Caption className="c-MessageChat__caption" size={captionSize}>
      {caption}
    </Caption>
  ) : null

  const loadingMarkup = isLoading ? (
    <Flexy.Item className="c-MessageChat__metaState">
      <Spinner className="c-MessageChat__loadingSpinner" size="xs" />
    </Flexy.Item>
  ) : null

  const errorMarkup = error ? (
    <div className="c-MessageChat__error">
      <Caption className="c-MessageChat__errorMessage">
        {typeof error === 'string' ? error : errorMessage}
      </Caption>
    </div>
  ) : null

  const metaMarkup = (
    <Flexy className="c-MessageChat__meta" gap="xs">
      {loadingMarkup}
      <Flexy.Block className="c-MessageChat__metaBlock">
        {captionMarkup}
        {errorMarkup}
      </Flexy.Block>
    </Flexy>
  )

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
      {metaMarkup}
    </ChatBlock>
  )
}

Chat.propTypes = propTypes
Chat.defaultProps = defaultProps

export default Chat
