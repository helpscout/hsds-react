import React from 'react'
import Animate from '../Animate'
import Flexy from '../Flexy'
import Action from './Action'
import Bubble from './Bubble'
import HoverWrapper from '../HoverWrapper'
import Timestamp from '../Timestamp'
import classNames from '../../utilities/classNames'
import {chatTypes, providerContextTypes} from './propTypes'

export const propTypes = chatTypes
const contextTypes = providerContextTypes

const ChatBlock = (props, context) => {
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
    type,
    ...rest
  } = props
  const {theme} = context

  const componentClassName = classNames(
    'c-MessageChatBlock',
    from && 'is-from',
    to && 'is-to',
    theme && `is-theme-${theme}`,
    type && `is-type-${type}`,
    className
  )

  const itemAlign = from ? 'left' : 'right'

  const timestampMarkup = timestamp ? (
    <Flexy.Item className='c-MessageChatBlock__timestamp'>
      <Animate in={isHovered} sequence='fade' animateOnMount={false}>
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
ChatBlock.contextTypes = contextTypes
ChatBlock.displayName = 'ChatBlock'

export default HoverWrapper(ChatBlock)
