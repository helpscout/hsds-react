// @flow
import React from 'react'
import ChatBlock from './ChatBlock'
import classNames from '../../utilities/classNames'
import { chatTypes } from './propTypes'
import type { Chat } from './types'

type Props = Chat

const Content = (props: Props) => {
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

  const componentClassName = classNames('c-MessageContent', className)

  const innerComponentClassName = classNames(
    'c-MessageContent__content',
    from && 'is-from',
    ltr && !rtl && 'is-ltr',
    !ltr && rtl && 'is-rtl',
    to && 'is-to'
  )

  const chatProps = {
    from,
    ltr,
    read,
    rtl,
    type,
    timestamp,
    to,
  }

  return (
    <ChatBlock {...chatProps} className={componentClassName}>
      <div className={innerComponentClassName} {...rest}>
        {children}
      </div>
    </ChatBlock>
  )
}

export default Content
