import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Button from './GreeterCard.Button'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import Animate from '../Animate'
import {
  GreeterCardUI,
  TitleUI,
  SubtitleUI,
  BodyUI,
  ActionUI,
} from './GreeterCard.css'
import { COMPONENT_KEY } from './GreeterCard.utils'

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
  subtitle?: string
  title?: string
}

export class GreeterCard extends React.PureComponent<Props> {
  static className = 'c-GreeterCard'
  static defaultProps = {
    align: 'right',
    animationSequence: 'fade up',
    innerRef: noop,
    in: true,
  }

  static Button = Button

  getClassName() {
    const { align, className } = this.props
    return classNames(
      GreeterCard.className,
      align && `is-align-${align}`,
      className
    )
  }

  renderTitle() {
    const { title } = this.props
    return title ? (
      <TitleUI size="h4" data-cy="beacon-greeter-title">
        {title}
      </TitleUI>
    ) : null
  }

  renderSubtitle() {
    const { subtitle } = this.props
    return subtitle ? (
      <SubtitleUI
        size="h5"
        weight={400}
        light
        data-cy="beacon-greeter-subtitle"
      >
        {subtitle}
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
        data-cy="beacon-greeter-body-content"
        shade="slightlyMuted"
      >
        {body}
      </BodyUI>
    ) : null
  }

  renderAction() {
    const { action } = this.props
    return action ? (
      <ActionUI data-cy="beacon-greeter-cta-wrapper">{action()}</ActionUI>
    ) : null
  }

  render() {
    const {
      animationDuration,
      animationEasing,
      animationSequence,
      children,
      innerRef,
      in: inProp,
      ...rest
    } = this.props

    return (
      <Animate
        in={inProp}
        duration={animationDuration}
        easing={animationEasing}
        sequence={animationSequence}
      >
        <GreeterCardUI
          {...getValidProps(rest)}
          className={this.getClassName()}
          innerRef={innerRef}
        >
          {this.renderTitle()}
          {this.renderSubtitle()}
          {this.renderBody()}
          {children}
          {this.renderAction()}
        </GreeterCardUI>
      </Animate>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(GreeterCard)

export default PropConnectedComponent
