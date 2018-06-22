// @flow
import React from 'react'
import Flexy from '../Flexy'
import Heading from '../Heading'
import LoadingDots from '../LoadingDots'
import Icon from '../Icon'
import Text from '../Text'
import classNames from '../../utilities/classNames'
import { isWord } from '../../utilities/strings'
import { isNativeSpanType } from '../../utilities/types'
import { providerContextTypes } from './propTypes'
import type { MessageBubble, MessageThemeContext } from './types'

type Props = MessageBubble
type Context = MessageThemeContext

const Bubble = (props: Props, context: Context) => {
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
    typing,
    type,
    ...rest
  } = props
  const { theme } = context

  const isThemeNotifications = theme === 'notifications'
  const fromName = from && typeof from === 'string' ? from : null

  const componentClassName = classNames(
    'c-MessageBubble',
    from && 'is-from',
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
      <span className="c-MessageBubble__body">
        <Text wordWrap>{child}</Text>
      </span>
    ) : (
      child
    )
  })

  const fromMarkup =
    isThemeNotifications && fromName ? (
      <div className="c-MessageBubble__from">
        <Text className="c-MessageBubble__fromText" lineHeightReset size="11">
          {fromName}
        </Text>
      </div>
    ) : null

  const iconMarkup = icon ? (
    <Flexy.Item className="c-MessageBubble__iconWrapper">
      <Icon
        className="c-MessageBubble__icon"
        name={icon}
        size="20"
        shade="extraMuted"
      />
    </Flexy.Item>
  ) : null

  const titleMarkup = title ? (
    <Heading className="c-MessageBubble__title" size="small">
      {title}
    </Heading>
  ) : null

  const bodyMarkup = body ? (
    <span
      className="c-MessageBubble__body"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  ) : (
    childrenMarkup
  )
  const innerContentMarkup = typing ? (
    <div className="c-MessageBubble__typing">
      <LoadingDots />
    </div>
  ) : (
    bodyMarkup
  )

  const contentMarkup = (
    <Flexy className="c-MessageBubble__content" align="top" gap="xs">
      {iconMarkup}
      <Flexy.Block className="c-MessageBubble__bodyWrapper">
        {innerContentMarkup}
      </Flexy.Block>
    </Flexy>
  )

  return (
    <div className={componentClassName} {...rest}>
      {fromMarkup}
      {titleMarkup}
      {contentMarkup}
    </div>
  )
}

Bubble.contextTypes = providerContextTypes
Bubble.displayName = 'Message.Bubble'

export default Bubble
