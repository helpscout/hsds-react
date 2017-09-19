import React from 'react'
import Heading from '../Heading'
import Text from '../Text'
import classNames from '../../utilities/classNames'
import { bubbleTypes } from './propTypes'

export const propTypes = bubbleTypes

const Bubble = props => {
  const {
    children,
    className,
    from,
    ltr,
    primary,
    rtl,
    size,
    timestamp,
    title,
    to,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-MessageBubble',
    from && 'is-from',
    size && `is-${size}`,
    primary && 'is-primary',
    (ltr && !rtl) && 'is-ltr',
    (!ltr && rtl) && 'is-rtl',
    to && 'is-to',
    className
  )

  const childrenMarkup = React.Children.map(children, child => {
    return typeof child === 'string' || typeof child === 'number'
      ? (<Text>{child}</Text>) : child
  })

  const titleMarkup = (primary && title) ? (
    <Heading className='c-MessageBubble__title' size='small'>
      {title}
    </Heading>
  ) : null

  return (
    <div className={componentClassName} {...rest}>
      {titleMarkup}
      {childrenMarkup}
    </div>
  )
}

Bubble.propTypes = propTypes

export default Bubble
