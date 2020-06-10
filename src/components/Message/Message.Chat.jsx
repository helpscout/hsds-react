import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import MessageBubble from './Message.Bubble'
import MessageCaption from './Message.Caption'
import Flexy from '../Flexy'
import Spinner from '../Spinner'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ChatBlockUI } from './Message.Chat.css'

export class MessageChat extends React.PureComponent {
  render() {
    const {
      body,
      bubbleClassName,
      caption,
      captionSize,
      metaPosition,
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
      rtl,
      size,
      timestamp,
      title,
      to,
      typing,
      ...rest
    } = this.props

    const { theme } = this.context
    const isThemeEmbed = theme === 'embed'

    const componentClassName = classNames(
      'c-MessageChat',
      from && 'is-from',
      to && 'is-to',
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
    }

    const captionMarkup = caption ? (
      <MessageCaption className="c-MessageChat__caption" size={captionSize}>
        {caption}
      </MessageCaption>
    ) : null

    const loadingMarkup = isLoading ? (
      <Flexy.Item className="c-MessageChat__metaState">
        <Spinner className="c-MessageChat__loadingSpinner" size="xs" />
      </Flexy.Item>
    ) : null

    const errorMarkup = error ? (
      <div className="c-MessageChat__error">
        <MessageCaption className="c-MessageChat__errorMessage">
          {typeof error === 'string' ? error : errorMessage}
        </MessageCaption>
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
      <ChatBlockUI
        {...getValidProps(rest)}
        className={componentClassName}
        meta={metaMarkup}
        metaPosition={metaPosition}
        read={read}
        isEmbed={isThemeEmbed}
        {...chatProps}
      >
        <MessageBubble
          {...chatProps}
          className={bubbleClassName}
          isNote={isNote}
          size={size}
          title={title}
          typing={typing}
        />
      </ChatBlockUI>
    )
  }
}

MessageChat.propTypes = {
  body: PropTypes.string,
  bubbleClassName: PropTypes.string,
  caption: PropTypes.string,
  captionSize: PropTypes.string,
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  errorMessage: PropTypes.string,
  from: PropTypes.any,
  icon: PropTypes.string,
  isLoading: PropTypes.bool,
  isNote: PropTypes.bool,
  ltr: PropTypes.bool,
  metaPosition: PropTypes.oneOf(['top', 'bottom']),
  onBubbleClick: PropTypes.func,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  read: PropTypes.bool,
  rtl: PropTypes.bool,
  size: PropTypes.oneOf(['md', 'sm', '']),
  timestamp: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.any,
  type: PropTypes.oneOf(['action', 'message', '']),
  typing: PropTypes.bool,
}

MessageChat.contextTypes = {
  theme: noop,
}

MessageChat.defaultProps = {
  'data-cy': 'MessageChat',
  error: false,
  errorMessage: "Couldn't send.",
  isLoading: false,
  metaPosition: 'bottom',
}

export default MessageChat
