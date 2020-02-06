import * as React from 'react'
import { MessageBubble, MessageThemeContext } from './Message.types'
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
} from '../../utilities/strings'

import {
  MessageBubbleUI,
  MessageBubbleBodyUI,
  MessageBubbleFromUI,
  MessageBubbleIconWrapperUI,
  MessageBubbleTitleUI,
  MessageBubbleTypingUI,
} from './Message.Bubble.css'

type Props = MessageBubble
type Context = MessageThemeContext

// convertLinksToHTML will escape for output as HTML
const enhanceBody = compose(newlineToHTML, convertLinksToHTML)

export const Bubble = (props: Props, context: Context) => {
  const {
    body,
    children,
    className,
    from,
    icon,
    isNote,
    ltr,
    primary,
    rtl,
    size,
    timestamp,
    title,
    to,
    type,
    typing,
    ...rest
  } = props
  const { theme } = context

  const isThemeNotifications = theme === 'notifications'
  const fromName = from && typeof from === 'string' ? from : null

  const componentClassName = classNames(
    'c-MessageBubble',
    from && 'is-from',
    icon && 'withIcon',
    isNote && 'is-note',
    primary && 'is-primary',
    size && `is-${size}`,
    ltr && !rtl && 'is-ltr',
    !ltr && rtl && 'is-rtl',
    theme && `is-theme-${theme}`,
    to && 'is-to',
    typing && 'is-typing',
    className
  )

  const childrenMarkup = React.Children.map(children, child => {
    return isWord(child) || isNativeSpanType(child) ? (
      <MessageBubbleBodyUI className="c-MessageBubble__body">
        <Text lineHeightInherit wordWrap>
          {child}
        </Text>
      </MessageBubbleBodyUI>
    ) : (
      child
    )
  })

  const fromMarkup =
    isThemeNotifications && fromName ? (
      <MessageBubbleFromUI className="c-MessageBubble__from">
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

  const bodyMarkup = body ? (
    <MessageBubbleBodyUI
      className="c-MessageBubble__body"
      dangerouslySetInnerHTML={{
        __html: enhanceBody(body),
      }}
    />
  ) : (
    childrenMarkup
  )

  const innerContentMarkup = typing ? (
    <MessageBubbleTypingUI className="c-MessageBubble__typing">
      <TypingDots />
    </MessageBubbleTypingUI>
  ) : (
    bodyMarkup
  )

  const contentMarkup = (
    <div className="c-MessageBubble__content">
      {iconMarkup}
      <div className="c-MessageBubble__bodyWrapper">{innerContentMarkup}</div>
    </div>
  )

  return (
    <MessageBubbleUI className={componentClassName} {...rest}>
      {fromMarkup}
      {titleMarkup}
      {contentMarkup}
    </MessageBubbleUI>
  )
}

Bubble.contextTypes = {
  theme: noop,
}

Bubble.displayName = 'MessageBubble'

export default Bubble
