import * as React from 'react'
import { MessageBubble, MessageThemeContext } from './Message.types'
import { noop } from '../../utilities/other'
import { isNativeSpanType } from '@helpscout/react-utils/dist/isType'
import compose from '@helpscout/react-utils/dist/compose'
import Heading from '../Heading'
import TypingDots from '../TypingDots'
import Icon from '../Icon'
import Text from '../Text'
import styled from '../styled'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import {
  convertLinksToHTML,
  escapeHTML,
  isWord,
  newlineToHTML,
} from '../../utilities/strings'
import css, {
  BodyCSS,
  FromCSS,
  IconWrapperCSS,
  TitleCSS,
  TypingCSS,
} from './styles/Bubble.css'
import { COMPONENT_KEY } from './Message.utils'

type Props = MessageBubble
type Context = MessageThemeContext

// Sub-Components
const MessageBubbleBody = styled('span')(BodyCSS)
const MessageBubbleFrom = styled('div')(FromCSS)
const MessageBubbleIconWrapper = styled('div')(IconWrapperCSS)
const MessageBubbleTitle = styled(Heading)(TitleCSS)
const MessageBubbleTyping = styled('div')(TypingCSS)

// convertLinksToHTML will escape for output as HTML
const enhanceBody = compose(
  newlineToHTML,
  convertLinksToHTML
)

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
      <MessageBubbleBody className="c-MessageBubble__body">
        <Text lineHeightInherit wordWrap>
          {child}
        </Text>
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
    <MessageBubbleIconWrapper className="c-MessageBubble__iconWrapper">
      <Icon
        className="c-MessageBubble__icon"
        name={icon}
        size="20"
        shade="extraMuted"
      />
    </MessageBubbleIconWrapper>
  ) : null

  const titleMarkup = title ? (
    <MessageBubbleTitle className="c-MessageBubble__title" size="small">
      {title}
    </MessageBubbleTitle>
  ) : null

  const bodyMarkup = body ? (
    <MessageBubbleBody
      className="c-MessageBubble__body"
      dangerouslySetInnerHTML={{
        __html: enhanceBody(body),
      }}
    />
  ) : (
    childrenMarkup
  )

  const innerContentMarkup = typing ? (
    <MessageBubbleTyping className="c-MessageBubble__typing">
      <TypingDots />
    </MessageBubbleTyping>
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
    <div className={componentClassName} {...rest}>
      {fromMarkup}
      {titleMarkup}
      {contentMarkup}
    </div>
  )
}

Bubble.contextTypes = {
  theme: noop,
}

namespaceComponent(COMPONENT_KEY.Bubble)(Bubble)

export default styled(Bubble)(css)
