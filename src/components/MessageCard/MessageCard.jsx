import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import MessageCardButton from './MessageCard.Button'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import Animate from '../Animate'
import {
  MessageCardUI,
  TitleUI,
  SubtitleUI,
  BodyUI,
  ActionUI,
} from './MessageCard.css'
import Truncate from '../Truncate'

export class MessageCard extends React.PureComponent {
  static className = 'c-MessageCard'
  static Button = MessageCardButton

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
    const { title, subtitle } = this.props
    let { body } = this.props
    const withMargin = title || subtitle

    // if there is no html in the string, transform new line to paragraph
    if (body && !/<\/?[a-z][\s\S]*>/i.test(body)) {
      body = body.split('\n').join('<br>')
    }

    return body ? (
      <BodyUI withMargin={withMargin} data-cy="beacon-message-body-content">
        <div dangerouslySetInnerHTML={{ __html: body }} />
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

MessageCard.propTypes = {
  action: PropTypes.func,
  align: PropTypes.oneOf(['left', 'right']),
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.string,
  animationSequence: PropTypes.string,
  body: PropTypes.string,
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
  in: PropTypes.bool,
  isMobile: PropTypes.bool,
  isWithBoxShadow: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,
}

MessageCard.defaultProps = {
  align: 'right',
  animationSequence: '',
  'data-cy': 'MessageCard',
  innerRef: noop,
  in: true,
  isMobile: false,
  isWithBoxShadow: true,
}

export default MessageCard
