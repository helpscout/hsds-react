import React from 'react'
import classNames from '../../utilities/classNames'
// import PropTypes from 'prop-types'
import Chat from './Chat'

export const propTypes = {
}

const Message = props => {
  const {
    children,
    className,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Message',
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

Message.propTypes = propTypes
Message.Chat = Chat

export default Message
