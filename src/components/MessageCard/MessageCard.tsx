import * as React from 'react'

import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Button from './MessageCard.Button'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import Animate from '../Animate'
import {
  MessageCardUI,
  TitleUI,
  SubtitleUI,
  BodyUI,
  ActionUI,
} from './styles/MessageCard.css'

import Truncate from '../Truncate'

export interface Props {
  action?: Function
  align: 'left' | 'right'
  animationDuration?: number
  animationEasing?: string
  animationSequence: string
  body?: string
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
  in: boolean
  isMobile: boolean
  isWithBoxShadow: boolean
  subtitle?: string
  title?: string
}

export class MessageCard extends React.PureComponent<Props> {
  static className = 'c-MessageCard'
  static defaultProps = {
    align: 'right',
    animationSequence: '',
    innerRef: noop,
    in: true,
    isMobile: false,
    isWithBoxShadow: true,
  }

  static Button = Button

  getClassName() {
    const { align, className, isMobile, isWithBoxShadow } = this.props
    return classNames(
      MessageCard.className,
      align && `is-align-${align}`,
      className,
      isMobile && 'is-mobile',
      isWithBoxShadow && `is-with-box-shadow`
    )
  }

  getTruncatedText(text, limit) {
    return (
      <Truncate limit={limit} type="end">
        {text}
      </Truncate>
    )
  }

  renderTitle() {
    const { title } = this.props
    return title ? (
      <TitleUI size="h4" data-cy="beacon-message-title">
        {this.getTruncatedText(title, 110)}
      </TitleUI>
    ) : null
  }

  renderSubtitle() {
    const { subtitle } = this.props
    return subtitle ? (
      <SubtitleUI
        size="h5"
        weight={500}
        light
        data-cy="beacon-message-subtitle"
      >
        {this.getTruncatedText(subtitle, 110)}
      </SubtitleUI>
    ) : null
  }

  renderBody() {
    const { body, title, subtitle } = this.props
    const withMargin = title || subtitle
    return body ? (
      <BodyUI
        block
        withMargin={withMargin}
        data-cy="beacon-message-body-content"
        shade="slightlyMuted"
      >
        {this.getTruncatedText(body, 500)}
      </BodyUI>
    ) : null
  }

  renderAction() {
    const { action } = this.props
    return action ? (
      <ActionUI data-cy="beacon-message-cta-wrapper">{action()}</ActionUI>
    ) : null
  }

  render() {
    const {
      action,
      animationDuration,
      animationEasing,
      animationSequence,
      children,
      innerRef,
      in: inProp,
      title,
      ...rest
    } = this.props

    return (
      <Animate
        className="c-MessageCardWrapper"
        in={inProp}
        duration={animationDuration}
        easing={animationEasing}
        sequence={animationSequence}
      >
        <MessageCardUI
          {...getValidProps(rest)}
          className={this.getClassName()}
          ref={innerRef}
        >
          {this.renderTitle()}
          {this.renderSubtitle()}
          {this.renderBody()}
          {children}
          {this.renderAction()}
        </MessageCardUI>
      </Animate>
    )
  }
}

export default MessageCard
