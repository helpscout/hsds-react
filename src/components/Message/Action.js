import React from 'react'
import Text from '../Text'
import ChatBlock from './ChatBlock'
import classNames from '../../utilities/classNames'
import { chatTypes } from './propTypes'

export const propTypes = chatTypes

const Action = props => {
  const {
    children,
    className,
    from,
    ltr,
    rtl,
    to,
    read,
    timestamp,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-MessageAction',
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
        <Text muted size='13'>
          {children}
        </Text>
      </div>
    </ChatBlock>
  )
}

Action.propTypes = propTypes

export default Action
