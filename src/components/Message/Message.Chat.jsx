import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import MessageBubble from './Message.Bubble'
import MessageCaption from './Message.Caption'
import Flexy from '../Flexy'
import Spinner from '../Spinner'
import classNames from 'classnames'
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

function noop() {}

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

MessageChat.propTypes = {
  body: PropTypes.string,
  /** Custom class names for the child Bubble component. */
  bubbleClassName: PropTypes.string,
  /** Renders a Caption. */
  caption: PropTypes.string,
  /** Adjusts the size of the Caption text. */
  captionSize: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Provides author information and applies "From" styles. */
  from: PropTypes.any,
  /** Applies "note" styles. */
  isNote: PropTypes.bool,
  /** Applies left-to-right text styles. */
  ltr: PropTypes.bool,
  /** Determines if the Message is read. */
  read: PropTypes.bool,
  /** Applies right-to-left text styles. */
  rtl: PropTypes.bool,
  /** Determines the size of the component. */
  size: PropTypes.oneOf(['md', 'sm', '']),
  /** Timestamp for the Message. */
  timestamp: PropTypes.string,
  /** Renders a Heading title in the component. */
  title: PropTypes.string,
  /** Provides author information and applies "To" styles. */
  to: PropTypes.any,
  /** Renders TypingDots within the component. */
  typing: PropTypes.bool,
  /** Renders the error caption. Default `false`. */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Customizes the error caption. */
  errorMessage: PropTypes.string,
  icon: PropTypes.string,
  isLoading: PropTypes.bool,
  metaPosition: PropTypes.oneOf(['top', 'bottom']),
  /** Callback when Bubble clicked. */
  onBubbleClick: PropTypes.func,
  /** Callback when clicked. */
  onClick: PropTypes.func,
  /** Applies "primary" styles. */
  primary: PropTypes.bool,
  type: PropTypes.oneOf(['action', 'message', '']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default MessageChat
