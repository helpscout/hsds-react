import React from 'react'
import Heading from '../Heading'
import LoadingDots from '../LoadingDots'
import Text from '../Text'
import classNames from '../../utilities/classNames'
import { isWord } from '../../utilities/strings'
import { isNativeSpanType } from '../../utilities/types'
import { bubbleTypes } from './propTypes'

export const propTypes = bubbleTypes

const Bubble = props => {
  const {
    children,
    className,
    from,
    isNote,
    ltr,
    primary,
    rtl,
    size,
    timestamp,
    title,
    to,
    typing,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-MessageBubble',
    from && 'is-from',
    isNote && 'is-note',
    primary && 'is-primary',
    size && `is-${size}`,
    (ltr && !rtl) && 'is-ltr',
    (!ltr && rtl) && 'is-rtl',
    to && 'is-to',
    typing && 'is-typing',
    className
  )

  const childrenMarkup = React.Children.map(children, child => {
    return isWord(child) || isNativeSpanType(child) ? (
      <Text wordWrap>
        {child}
      </Text>
    ) : child
  })

  const titleMarkup = title ? (
    <Heading className='c-MessageBubble__title' size='small'>
      {title}
    </Heading>
  ) : null

  const contentMarkup = typing ? (
    <div className='c-MessageBubble__typing'>
      <LoadingDots />
    </div>
  ) : childrenMarkup

  return (
    <div className={componentClassName} {...rest}>
      {titleMarkup}
      {contentMarkup}
    </div>
  )
}

Bubble.propTypes = propTypes

export default Bubble
