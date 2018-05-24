import React from 'react'
import ChatBlock from './ChatBlock'
import classNames from '../../utilities/classNames'
import { chatTypes } from './propTypes'

export const propTypes = chatTypes

const Content = props => {
  const {
    children,
    className,
    from,
    ltr,
    rtl,
    to,
    read,
    timestamp,
    type,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-MessageContent',
    from && 'is-from',
    ltr && !rtl && 'is-ltr',
    !ltr && rtl && 'is-rtl',
    to && 'is-to',
    className
  )

  return (
    <ChatBlock
      from={from}
      ltr={ltr}
      read={read}
      rtl={rtl}
      timestamp={timestamp}
      to={to}
    >
      <div className={componentClassName} {...rest}>
        {children}
      </div>
    </ChatBlock>
  )
}

Content.propTypes = propTypes

export default Content
