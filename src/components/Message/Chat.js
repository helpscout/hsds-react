import React from 'react'
import classNames from '../../utilities/classNames'
// import PropTypes from 'prop-types'
import Text from '../Text'

export const propTypes = {
}

const Chat = props => {
  const {
    children,
    className,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-MessageChat',
    className
  )

  return (
    <div>
      <div className={componentClassName} {...rest}>
        <Text>
          {children}
        </Text>
      </div>
    </div>
  )
}

Chat.propTypes = propTypes

export default Chat
