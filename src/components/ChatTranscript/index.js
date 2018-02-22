import React from 'react'
import Item from './Item'
import classNames from '../../utilities/classNames'

const ChatTranscript = props => {
  const {
    children,
    className,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-ChatTranscript',
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

ChatTranscript.Item = Item

export default ChatTranscript
