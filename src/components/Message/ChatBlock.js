// @flow
import React, { PureComponent as Component } from 'react'
import Animate from '../Animate'
import Flexy from '../Flexy'
import Action from './Action'
import Bubble from './Bubble'
import HoverWrapper from '../HoverWrapper'
import Timestamp from '../Timestamp'
import classNames from '../../utilities/classNames'
import { chatTypes, providerContextTypes } from './propTypes'
import type { MessageChat } from './types'

type Props = MessageChat & {
  body?: string,
  children?: any,
  icon?: string,
  isHovered?: boolean,
}

class ChatBlock extends Component<Props> {
  static contextTypes = providerContextTypes
  static displayName = 'Message.ChatBlock'

  render() {
    const {
      body,
      children,
      className,
      icon,
      isNote,
      ltr,
      rtl,
      read,
      from,
      isHovered,
      timestamp,
      to,
      type,
      ...rest
    } = this.props
    const { theme } = this.context

    const componentClassName = classNames(
      'c-MessageChatBlock',
      from && 'is-from',
      to && 'is-to',
      theme && `is-theme-${theme}`,
      type && `is-type-${type}`,
      className
    )

    const timestampMarkup = timestamp ? (
      <Flexy.Item className="c-MessageChatBlock__timestamp">
        <Animate in={isHovered} sequence="fade" animateOnMount={false}>
          <Timestamp timestamp={timestamp} read={read} />
        </Animate>
      </Flexy.Item>
    ) : null

    const childrenMarkup = React.Children.map(children, child => {
      return child && (child.type === Action || child.type === Bubble)
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

    return (
      <div className={componentClassName} {...rest}>
        <Flexy className="c-MessageChatBlock__flexy" gap="sm">
          {to && timestampMarkup}
          <Flexy.Item className="c-MessageChatBlock__block">
            {childrenMarkup}
          </Flexy.Item>
          {from && timestampMarkup}
        </Flexy>
      </div>
    )
  }
}

export default HoverWrapper(ChatBlock)
