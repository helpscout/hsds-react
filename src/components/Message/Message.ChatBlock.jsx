import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import MessageBubble from './Message.Bubble'
import Timestamp from '../Timestamp'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ChatBlockUI } from './Message.ChatBlock.css'

export class ChatBlock extends React.PureComponent {
  getChildrenMarkup = () => {
    const { children, icon, from, ltr, rtl, timestamp, to } = this.props

    return React.Children.map(children, child => {
      return child && child.type === MessageBubble
        ? React.cloneElement(child, {
            icon,
            from,
            ltr,
            rtl,
            timestamp,
            to,
          })
        : child
    })
  }

  getTimestampMarkup = () => {
    const { read, timestamp } = this.props

    return (
      timestamp && (
        <Flexy.Item className="c-MessageChatBlock__timestamp">
          <Timestamp timestamp={timestamp} read={read} />
        </Flexy.Item>
      )
    )
  }

  render() {
    const {
      body,
      children,
      className,
      from,
      icon,
      isNote,
      ltr,
      meta,
      metaPosition,
      read,
      rtl,
      timestamp,
      to,
      ...rest
    } = this.props
    const { theme } = this.context

    const componentClassName = classNames(
      'c-MessageChatBlock',
      from && 'is-from',
      to && 'is-to',
      theme && `is-theme-${theme}`,
      className
    )

    const childrenMarkup = this.getChildrenMarkup()
    const timestampMarkup = this.getTimestampMarkup()

    return (
      <ChatBlockUI {...getValidProps(rest)} className={componentClassName}>
        {metaPosition !== 'bottom' && meta}
        <Flexy className="c-MessageChatBlock__flexy" gap="sm">
          {to && timestampMarkup}
          <Flexy.Item className="c-MessageChatBlock__block">
            {childrenMarkup}
          </Flexy.Item>
          {from && timestampMarkup}
        </Flexy>
        {metaPosition === 'bottom' && meta}
      </ChatBlockUI>
    )
  }
}

ChatBlock.contextTypes = {
  theme: noop,
}

ChatBlock.defaultProps = {
  metaPosition: 'bottom',
}

ChatBlock.propTypes = {
  body: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  icon: PropTypes.string,
  meta: PropTypes.any,
  metaPosition: PropTypes.string,
  /** Determines if the Message is read. */
  read: PropTypes.bool,
  /** Timestamp for the Message. */
  timestamp: PropTypes.string,
  /** Provides author information and applies "From" styles. */
  from: PropTypes.any,
  /** Applies "note" styles. */
  isNote: PropTypes.bool,
  /** Applies left-to-right text styles. */
  ltr: PropTypes.bool,
  /** Callback when clicked. */
  onClick: PropTypes.func,
  /** Applies right-to-left text styles. */
  rtl: PropTypes.bool,
  /** Provides author information and applies "To" styles. */
  to: PropTypes.any,
}

export default ChatBlock
