import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import Flexy from '../Flexy'
import Text from '../Text'
import MessageAction from './Message.Action'
import MessageAttachment from './Message.Attachment'
import MessageBubble from './Message.Bubble'
import MessageCaption from './Message.Caption'
import MessageChat from './Message.Chat'
import MessageContent from './Message.Content'
import MessageEmbed from './Message.Embed'
import MessageMedia from './Message.Media'
import MessageProvider from './Message.Provider'
import classNames from 'classnames'
import { getComponentName } from '@hsds/utils-react'
import isString from 'lodash.isstring'
import { MessageUI } from './Message.css'

function noop() {}

export class Message extends React.PureComponent {
  static contextTypes = {
    theme: noop,
  }
  static Action = MessageAction
  static Attachment = MessageAttachment
  static Bubble = MessageBubble
  static Caption = MessageCaption
  static Chat = MessageChat
  static Content = MessageContent
  static Embed = MessageEmbed
  static Media = MessageMedia
  static Provider = MessageProvider

  shouldShowAvatar = () => {
    const { from, showAvatar } = this.props

    // This prevents spacing issues when children include
    // `Message.Action` which requires the full width of the screen.
    if (this.childrenIncludeActionTypeComponent()) return false

    return this.isThemeEmbed() ? (from && showAvatar) || false : !!showAvatar
  }

  childrenIncludeActionTypeComponent = () => {
    const { children } = this.props
    const childArray = React.Children.toArray(children)

    return childArray.some(child => {
      const componentName = getComponentName(child)

      return componentName === 'MessageAction'
    })
  }

  isThemeEmbed = () => {
    const { theme } = this.context
    return theme === 'embed'
  }

  getAvatarMarkup = () => {
    const { avatar } = this.props
    const isThemeEmbed = this.isThemeEmbed()

    if (!this.shouldShowAvatar()) return null

    const avatarMarkup = avatar
      ? React.cloneElement(avatar, {
          shape: 'circle',
          size: isThemeEmbed ? 'xxs' : 'xs',
        })
      : null

    return (
      <Flexy.Item className="c-Message__avatar-block">
        {avatarMarkup}
      </Flexy.Item>
    )
  }

  getChildrenMarkup = () => {
    const { children, from, ltr, rtl, to } = this.props

    return React.Children.map(children, child => {
      if (!child) return child

      return React.cloneElement(child, {
        from,
        ltr,
        rtl,
        to,
      })
    })
  }

  getFromMarkup = () => {
    const { from } = this.props
    const fromName = isString(from) ? from : null

    if (!(this.isThemeEmbed() && fromName)) return null

    return (
      <div className="c-Message__from">
        <Text
          className="c-Message__fromText"
          block
          lineHeightReset
          shade="faint"
          size="11"
        >
          {fromName}
        </Text>
      </div>
    )
  }

  render() {
    const {
      avatar,
      children,
      className,
      isNote,
      ltr,
      rtl,
      from,
      showAvatar,
      to,
      ...rest
    } = this.props
    const { theme } = this.context

    const componentClassName = classNames(
      'c-Message',
      avatar && 'has-avatar',
      from && 'is-from',
      theme && `is-theme-${theme}`,
      to && 'is-to',
      className
    )

    const avatarMarkup = this.getAvatarMarkup()
    const childrenMarkup = this.getChildrenMarkup()
    const fromMarkup = this.getFromMarkup()

    return (
      <MessageUI {...getValidProps(rest)} className={componentClassName}>
        {fromMarkup}
        <Flexy align="top" gap="xs">
          {from && avatarMarkup}
          <Flexy.Block className="c-Message__block">
            {childrenMarkup}
          </Flexy.Block>
          {to && avatarMarkup}
        </Flexy>
      </MessageUI>
    )
  }
}

Message.defaultProps = {
  'data-cy': 'Message',
  showAvatar: true,
}

Message.propTypes = {
  /** An `Avatar` component containing author details. */
  avatar: PropTypes.any,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Provides author information and applies "From" styles. */
  from: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Applies the "Note" theme styles. */
  isNote: PropTypes.bool,
  /** Applies left-to-right text styles. */
  ltr: PropTypes.bool,
  /** Applies right-to-left text styles. */
  rtl: PropTypes.bool,
  /** Renders a space for the Avatar to appear. Default is `true`. */
  showAvatar: PropTypes.bool,
  /** Provides author information and applies "To" styles. */
  to: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Message
