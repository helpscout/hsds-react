import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { noop } from '../../utilities/other'
import { isNativeSpanType } from '@helpscout/react-utils/dist/isType'
import compose from '@helpscout/react-utils/dist/compose'
import TypingDots from '../TypingDots'
import Icon from '../Icon'
import Text from '../Text'
import classNames from 'classnames'
import {
  convertLinksToHTML,
  isWord,
  newlineToHTML,
  textIncludesOnlyEmoji,
} from '../../utilities/strings'
import {
  MessageBubbleUI,
  MessageBubbleBodyUI,
  MessageBubbleFromUI,
  MessageBubbleIconWrapperUI,
  MessageBubbleTitleUI,
  MessageBubbleTypingUI,
} from './Message.Bubble.css'

// convertLinksToHTML will escape for output as HTML
const enhanceBody = compose(newlineToHTML, convertLinksToHTML)

export const MessageBubble = (props, context) => {
  const {
    body,
    children,
    className,
    from,
    icon,
    isNote,
    ltr,
    rtl,
    size,
    timestamp,
    title,
    to,
    typing,
    ...rest
  } = props
  const { theme } = context
  const isThemeNotifications = theme === 'notifications'
  const isThemeEmbed = theme === 'embed'
  const fromName = from && typeof from === 'string' ? from : null
  let showEmojiOnlyStyles = false
  const fromMarkup =
    isThemeNotifications && fromName ? (
      <MessageBubbleFromUI
        className="c-MessageBubble__from"
        isEmbed={isThemeEmbed}
      >
        <Text className="c-MessageBubble__fromText" lineHeightReset size="11">
          {fromName}
        </Text>
      </MessageBubbleFromUI>
    ) : null
  const iconMarkup = icon ? (
    <MessageBubbleIconWrapperUI className="c-MessageBubble__iconWrapper">
      <Icon
        className="c-MessageBubble__icon"
        name={icon}
        size="20"
        shade="extraMuted"
      />
    </MessageBubbleIconWrapperUI>
  ) : null
  const titleMarkup = title ? (
    <MessageBubbleTitleUI className="c-MessageBubble__title" size="small">
      {title}
    </MessageBubbleTitleUI>
  ) : null
  const hasOnlyOneChild = React.Children.count(children) === 1
  const childrenMarkup = React.Children.map(children, child => {
    showEmojiOnlyStyles =
      !isThemeEmbed && hasOnlyOneChild && textIncludesOnlyEmoji(child)
    const fontSize = isThemeEmbed ? '13' : showEmojiOnlyStyles ? 48 : '14'

    return isWord(child) || isNativeSpanType(child) ? (
      <MessageBubbleBodyUI
        className="c-MessageBubble__body"
        isEmbed={isThemeEmbed}
        showEmojiOnlyStyles={showEmojiOnlyStyles}
      >
        <Text wordWrap lineHeightInherit size={fontSize}>
          {child}
        </Text>
      </MessageBubbleBodyUI>
    ) : (
      child
    )
  })

  const renderBody = () => {
    if (!body) {
      return childrenMarkup
    }

    showEmojiOnlyStyles = !isThemeEmbed && textIncludesOnlyEmoji(body)

    if (showEmojiOnlyStyles) {
      return (
        <MessageBubbleBodyUI
          className="c-MessageBubble__body"
          showEmojiOnlyStyles={showEmojiOnlyStyles}
        >
          <Text wordWrap lineHeightInherit size={48}>
            {body}
          </Text>
        </MessageBubbleBodyUI>
      )
    }
    return (
      <MessageBubbleBodyUI
        className="c-MessageBubble__body"
        isEmbed={isThemeEmbed}
        dangerouslySetInnerHTML={{
          __html: enhanceBody(body),
        }}
      />
    )
  }

  const innerContentMarkup = typing ? (
    <MessageBubbleTypingUI className="c-MessageBubble__typing">
      <TypingDots />
    </MessageBubbleTypingUI>
  ) : (
    renderBody()
  )

  const contentMarkup = (
    <div className="c-MessageBubble__content">
      {iconMarkup}
      <div className="c-MessageBubble__bodyWrapper">{innerContentMarkup}</div>
    </div>
  )

  const componentClassName = classNames(
    'c-MessageBubble',
    from && 'is-from',
    icon && 'withIcon',
    isNote && 'is-note',
    size && `is-${size}`,
    ltr && !rtl && 'is-ltr',
    !ltr && rtl && 'is-rtl',
    theme && `is-theme-${theme}`,
    to && 'is-to',
    typing && 'is-typing',
    showEmojiOnlyStyles && 'emoji-only',
    className
  )

  return (
    <MessageBubbleUI
      {...getValidProps(rest)}
      className={componentClassName}
      isEmbed={isThemeEmbed}
      showEmojiOnlyStyles={showEmojiOnlyStyles}
    >
      {fromMarkup}
      {titleMarkup}
      {contentMarkup}
    </MessageBubbleUI>
  )
}

MessageBubble.defaultProps = {
  'data-cy': 'MessageBubble',
}

MessageBubble.contextTypes = {
  theme: noop,
}

MessageBubble.propTypes = {
  body: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Provides author information and applies "From" styles. */
  from: PropTypes.any,
  /** Applies "note" styles. */
  isNote: PropTypes.bool,
  /** Applies left-to-right text styles. */
  ltr: PropTypes.bool,
  /** Applies "primary" styles. */
  primary: PropTypes.bool,
  /** Determines if the Message is read. */
  read: PropTypes.bool,
  /** Applies right-to-left text styles. */
  rtl: PropTypes.bool,
  /** Determines the size of the component. */
  size: PropTypes.oneOf(['md', 'sm', '']),
  /** Timestamp for the Message. */
  timestamp: PropTypes.string,
  /** Renders a `Heading` title in the component. */
  title: PropTypes.string,
  /** Provides author information and applies "To" styles. */
  to: PropTypes.any,
  /** Renders `TypingDots` within the component. */
  typing: PropTypes.bool,
  /** Callback when clicked. */
  onClick: PropTypes.func,
  icon: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default MessageBubble
