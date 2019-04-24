// @flow
import type { Node } from 'react'
import type { Message as MessageType } from './types'
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import Text from '../Text'
import Action from './Action'
import Attachment from './Attachment'
import Bubble from './Bubble'
import Caption from './Caption'
import Chat from './Chat'
import Content from './Content'
import Embed from './Embed'
import Media from './Media'
import Provider from './Provider'
import Question from './Question'
import styled from '../styled'
import { classNames } from '../../utilities/classNames'
import {
  isComponentTypeChat,
  namespaceComponent,
} from '../../utilities/component'
import { isString } from '../../utilities/is'
import { providerContextTypes } from './propTypes'
import css from './styles/Message.css.js'
import { COMPONENT_KEY } from './utils'

type Props = MessageType & {
  avatar?: any,
  showAvatar?: boolean,
}

export class Message extends Component<Props> {
  static defaultProps = {
    showAvatar: true,
  }
  static contextTypes = providerContextTypes
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

  getChildrenMarkup = (): ?Node => {
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

  getFromMarkup = (): ?Node => {
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
