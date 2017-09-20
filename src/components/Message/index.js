import React from 'react'
import classNames from '../../utilities/classNames'
import PropTypes from 'prop-types'
import Flexy from '../Flexy'
import Action from './Action'
import Bubble from './Bubble'
import Chat from './Chat'
import Content from './Content'
import Media from './Media'
import Question from './Question'
import Timestamp from './Timestamp'
import { messageTypes } from './propTypes'

export const propTypes = Object.assign({}, messageTypes, {
  showAvatar: PropTypes.bool
})

const defaultProps = {
  showAvatar: true
}

const Message = props => {
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

  const componentClassName = classNames(
    'c-Message',
    from && 'is-from',
    to && 'is-to',
    className
  )

  const isChatType = child => {
    const chatTypes = [Action, Chat, Content, Media, Question]
    return chatTypes.some(child.type)
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
      shape: 'rounded',
      size: 'sm'
    }) : null

  const avatarBlockMarkup = showAvatar ? (
    <Flexy.Item className='c-Message__avatar-block'>
      {avatarMarkup}
    </Flexy.Item>
  ) : null

  return (
    <div className={componentClassName} {...rest}>
      <Flexy align='top' gap='sm'>
        {from && avatarBlockMarkup}
        <Flexy.Block>
          {childrenMarkup}
        </Flexy.Block>
        {to && avatarBlockMarkup}
      </Flexy>
    </div>
  )
}

Message.propTypes = propTypes
Message.defaultProps = defaultProps
Message.Action = Action
Message.Bubble = Bubble
Message.Chat = Chat
Message.Content = Content
Message.Media = Media
Message.Question = Question
Message.Timestamp = Timestamp

export default Message
