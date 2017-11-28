import React from 'react'
import Animate from '../Animate'
import Flexy from '../Flexy'
import Action from './Action'
import Bubble from './Bubble'
import HoverWrapper from '../HoverWrapper'
import Timestamp from '../Timestamp'
import classNames from '../../utilities/classNames'
import { chatTypes } from './propTypes'

export const propTypes = chatTypes

const ChatBlock = props => {
  const {
    children,
    className,
    ltr,
    rtl,
    read,
    from,
    isHovered,
    timestamp,
    to,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-MessageChatBlock',
    from && 'is-from',
    to && 'is-to',
    className
  )

  const itemAlign = from ? 'left' : 'right'

  const timestampMarkup = timestamp ? (
    <Flexy.Item className='c-MessageChatBlock__timestamp'>
      <Animate in={isHovered} sequence='fadeIn' animateOnMount={false}>
        <Timestamp timestamp={timestamp} read={read} />
      </Animate>
    </Flexy.Item>
  ) : null

  const childrenMarkup = React.Children.map(children, child => {
    return (child.type === Action || child.type === Bubble)
      ? React.cloneElement(child, {
        from,
        ltr,
        rtl,
        timestamp,
        to
      })
      : child
  })

  return (
    <div className={componentClassName}
      {...rest}
    >
      <Flexy just={itemAlign} gap='sm'>
        {to && timestampMarkup}
        <Flexy.Item className='c-MessageChatBlock__block'>
          {childrenMarkup}
        </Flexy.Item>
        {from && timestampMarkup}
      </Flexy>
    </div>
  )
}

ChatBlock.propTypes = propTypes
ChatBlock.displayName = 'ChatBlock'

export default HoverWrapper(ChatBlock)
