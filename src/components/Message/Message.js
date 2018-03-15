import React from 'react'
import PropTypes from 'prop-types'
import Flexy from '../Flexy'
import Text from '../Text'
import Action from './Action'
import Attachment from './Attachment'
import Bubble from './Bubble'
import Caption from './Caption'
import Chat from './Chat'
import Content from './Content'
import Media from './Media'
import Provider from './Provider'
import Question from './Question'
import classNames from '../../utilities/classNames'
import {messageTypes, providerContextTypes} from './propTypes'

export const propTypes = Object.assign({}, messageTypes, {
  showAvatar: PropTypes.bool
})

const defaultProps = {
  showAvatar: true
}

const contextTypes = providerContextTypes

const Message = (props, context) => {
  const {
    avatar,
    children,
    className,
    ltr,
    rtl,
    from,
    showAvatar,
    to,
    ...rest
  } = props
  const {theme} = context

  const componentClassName = classNames(
    'c-Message',
    avatar && 'has-avatar',
    from && 'is-from',
    theme && `is-theme-${theme}`,
    to && 'is-to',
    className
  )

  const isThemeEmbed = theme === 'embed'
  const fromName = from && typeof from === 'string' ? from : null

  const maybeShowAvatar = (
    isThemeEmbed
    ? ((from && showAvatar) || false)
    : showAvatar
  )

  const isChatType = child => {
    const chatTypes = [
      Action,
      Attachment,
      Chat,
      Content,
      Media,
      Question
    ]
    return chatTypes.some(type => {
      return typeof child.type === 'function' && child.type === type
    })
  }

  const childrenMarkup = React.Children.map(children, (child) => {
    return isChatType(child)
      ? React.cloneElement(child, {
        from,
        ltr,
        rtl,
        to
      })
      : child
  })

  const avatarMarkup = avatar
    ? React.cloneElement(avatar, {
      shape: isThemeEmbed ? 'circle' : 'rounded',
      size: 'sm'
    }) : null

  const avatarBlockMarkup = maybeShowAvatar ? (
    <Flexy.Item className='c-Message__avatar-block'>
      {avatarMarkup}
    </Flexy.Item>
  ) : null

  const fromMarkup = isThemeEmbed && fromName ? (
    <div className='c-Message__from'>
      <Text
        className='c-Message__fromText'
        block
        lineHeightReset
        shade='faint'
        size='11'
      >
        {fromName}
      </Text>
    </div>
  ) : null

  return (
    <div className={componentClassName} {...rest}>
      {fromMarkup}
      <Flexy align='top' gap='sm'>
        {from && avatarBlockMarkup}
        <Flexy.Block className='c-Message__block'>
          {childrenMarkup}
        </Flexy.Block>
        {to && avatarBlockMarkup}
      </Flexy>
    </div>
  )
}

Message.propTypes = propTypes
Message.defaultProps = defaultProps
Message.contextTypes = contextTypes
Message.Action = Action
Message.Attachment = Attachment
Message.Bubble = Bubble
Message.Caption = Caption
Message.Chat = Chat
Message.Content = Content
Message.Media = Media
Message.Provider = Provider
Message.Question = Question

export default Message
