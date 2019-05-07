import * as React from 'react'
import { Message as MessageType } from './Message.types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import Text from '../Text'
import Action from './Message.Action'
import Attachment from './Message.Attachment'
import Bubble from './Message.Bubble'
import Caption from './Message.Caption'
import Chat from './Message.Chat'
import Content from './Message.Content'
import Embed from './Message.Embed'
import Media from './Message.Media'
import Provider from './Message.Provider'
import Question from './Message.Question'
import styled from '../styled'
import { classNames } from '../../utilities/classNames'
import {
  isComponentTypeChat,
  namespaceComponent,
} from '../../utilities/component'
import { isString } from '../../utilities/is'
import { noop } from '../../utilities/other'
import css from './styles/Message.css'
import { COMPONENT_KEY } from './Message.utils'

type Props = MessageType & {
  avatar?: any
  showAvatar?: boolean
}

export class Message extends React.PureComponent<Props> {
  static defaultProps = {
    showAvatar: true,
  }
  static contextTypes = {
    theme: noop,
  }
  static Action = Action
  static Attachment = Attachment
  static Bubble = Bubble
  static Caption = Caption
  static Chat = Chat
  static Content = Content
  static Embed = Embed
  static Media = Media
  static Provider = Provider
  static Question = Question

  shouldShowAvatar = (): boolean => {
    const { from, showAvatar } = this.props

    return this.isThemeEmbed() ? (from && showAvatar) || false : !!showAvatar
  }

  isThemeEmbed = (): boolean => {
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
      return isComponentTypeChat(child)
        ? React.cloneElement(child, {
            from,
            ltr,
            rtl,
            to,
          })
        : child
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
      <div {...getValidProps(rest)} className={componentClassName}>
        {fromMarkup}
        <Flexy align="top" gap="xs">
          {from && avatarMarkup}
          <Flexy.Block className="c-Message__block">
            {childrenMarkup}
          </Flexy.Block>
          {to && avatarMarkup}
        </Flexy>
      </div>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Message)(Message)

export default styled(Message)(css)
