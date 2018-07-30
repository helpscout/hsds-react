// @flow
import type { MessageBubble, MessageThemeContext } from './types'
import React from 'react'
import Flexy from '../Flexy'
import Heading from '../Heading'
import LoadingDots from '../LoadingDots'
import Icon from '../Icon'
import Text from '../Text'
import styled from '../styled'
import classNames from '../../utilities/classNames'
import { isWord } from '../../utilities/strings'
import { isNativeSpanType } from '../../utilities/types'
import { providerContextTypes } from './propTypes'
import css, {
  BodyCSS,
  FromCSS,
  TitleCSS,
  TypingCSS,
} from './styles/Bubble.css.js'

type Props = MessageBubble
type Context = MessageThemeContext

// Sub-Components
const MessageBubbleBody = styled('span')(BodyCSS)
const MessageBubbleFrom = styled('div')(FromCSS)
const MessageBubbleTitle = styled(Heading)(TitleCSS)
const MessageBubbleTyping = styled('div')(TypingCSS)

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
      <MessageBubbleBody className="c-MessageBubble__body">
        <Text wordWrap>{child}</Text>
      </MessageBubbleBody>
    ) : (
      child
    )
  })

  const fromMarkup =
    isThemeNotifications && fromName ? (
      <MessageBubbleFrom className="c-MessageBubble__from">
        <Text className="c-MessageBubble__fromText" lineHeightReset size="11">
          {fromName}
        </Text>
      </MessageBubbleFrom>
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
    <MessageBubbleTitle className="c-MessageBubble__title" size="small">
      {title}
    </MessageBubbleTitle>
  ) : null

  const bodyMarkup = body ? (
    <MessageBubbleBody
      className="c-MessageBubble__body"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  ) : (
    childrenMarkup
  )

  const innerContentMarkup = typing ? (
    <MessageBubbleTyping className="c-MessageBubble__typing">
      <LoadingDots />
    </MessageBubbleTyping>
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

export default styled(Bubble)(css)
