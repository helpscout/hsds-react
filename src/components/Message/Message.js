import React from 'react'
import classNames from '../../utilities/classNames'
import PropTypes from 'prop-types'
import Flexy from '../Flexy'
import Action from './Action'
import Bubble from './Bubble'
import Chat from './Chat'
import Content from './Content'
import Media from './Media'
import Provider from './Provider'
import Question from './Question'
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
    from && 'is-from',
    to && 'is-to',
    theme && `is-theme-${theme}`,
    className
  )

  const isThemeEmbed = theme === 'embed'
  const maybeShowAvatar = (
    isThemeEmbed
    ? ((from && showAvatar) || false)
    : showAvatar
  )

  const isChatType = child => {
    const chatTypes = [Action, Chat, Content, Media, Question]
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

  return (
    <div className={componentClassName} {...rest}>
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
Message.Bubble = Bubble
Message.Chat = Chat
Message.Content = Content
Message.Media = Media
Message.Provider = Provider
Message.Question = Question

export default Message
