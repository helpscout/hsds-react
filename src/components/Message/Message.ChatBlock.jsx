import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import Bubble from './Message.Bubble'
import Timestamp from '../Timestamp'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ChatBlockUI } from './Message.ChatBlock.css'

export class ChatBlock extends React.PureComponent {
  static propTypes = {
    body: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string,
    icon: PropTypes.string,
    meta: PropTypes.any,
    metaPosition: PropTypes.string,
    read: PropTypes.bool,
    timestamp: PropTypes.string,
    from: PropTypes.any,
    isNote: PropTypes.bool,
    ltr: PropTypes.bool,
    onClick: PropTypes.func,
    rtl: PropTypes.bool,
    to: PropTypes.any,
  }
  static contextTypes = {
    theme: noop,
  }

  static defaultProps = {
    metaPosition: 'bottom',
  }

  static displayName = 'Message.ChatBlock'

  getChildrenMarkup = () => {
    const { children, icon, from, ltr, rtl, timestamp, to } = this.props

    return React.Children.map(children, child => {
      return child && child.type === Bubble
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

export default ChatBlock
