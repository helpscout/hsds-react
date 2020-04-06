import React from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utilities/other'
import { isNativeSpanType } from '@helpscout/react-utils/dist/isType'
import compose from '@helpscout/react-utils/dist/compose'
import TypingDots from '../TypingDots'
import Icon from '../Icon'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
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

export const Bubble = (props, context) => {
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
      {...rest}
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

Bubble.propTypes = {
  body: PropTypes.string,
  className: PropTypes.string,
  from: PropTypes.any,
  icon: PropTypes.string,
  isNote: PropTypes.bool,
  ltr: PropTypes.bool,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  read: PropTypes.bool,
  rtl: PropTypes.bool,
  size: PropTypes.oneOf(['md', 'sm', '']),
  timestamp: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.any,
  typing: PropTypes.bool,
}

Bubble.contextTypes = {
  theme: noop,
}

Bubble.displayName = 'MessageBubble'

export default Bubble
