import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import EventListener from '../EventListener'
import ScrollLock from '../ScrollLock'
import { classNames } from '../../utilities/classNames'
import {
  getFadeTopStyles,
  getFadeBottomStyles,
  getFadeLeftStyles,
  getFadeRightStyles,
} from '../../utilities/scrollFade'
import { noop } from '../../utilities/other'
import { ScrollableUI, ContentUI, FaderUI } from './Scrollable.css'
import { COMPONENT_KEY } from './Scrollable.utils'

export interface Props {
  backgroundColor: string
  className?: string
  contentClassName?: string
  fade: boolean
  fadeBottom: boolean
  fadeLeft: boolean
  fadeRight: boolean
  faderSize: number
  innerRef: (node: HTMLElement) => void
  onScroll: (event: Event) => void
  rounded: boolean
  scrollableRef: (node: HTMLElement) => void
  isScrollLocked: boolean
}

export class Scrollable extends React.PureComponent<Props> {
  static defaultProps = {
    backgroundColor: 'white',
    fade: false,
    fadeBottom: false,
    fadeLeft: false,
    fadeRight: false,
    faderSize: 28,
    innerRef: noop,
    onScroll: noop,
    scrollableRef: noop,
    isScrollLocked: true,
  }

  faderNodeLeft: HTMLElement
  faderNodeTop: HTMLElement
  faderNodeRight: HTMLElement
  faderNodeBottom: HTMLElement
  containerNode: HTMLElement

  componentDidMount() {
    this.applyFade()
  }

  applyFade = () => {
    const containerNode = this.containerNode
    /* istanbul ignore else */
    if (containerNode) {
      this.applyFadeStyles({
        currentTarget: containerNode,
      })
    }
  }

  applyFadeStyles = event => {
    const {
      faderSize: offset,
      fade,
      fadeLeft,
      fadeRight,
      fadeBottom,
    } = this.props

    if (!fade && !fadeBottom && !fadeRight && !fadeLeft) return

    if (fade && this.faderNodeTop) {
      const transformTop = getFadeTopStyles(event, offset)
      this.faderNodeTop.style.transform = transformTop
      this.applyFadeStyleOffset(this.faderNodeTop)
    }

    if (fadeBottom && this.faderNodeBottom) {
      const transformBottom = getFadeBottomStyles(event, offset)
      this.faderNodeBottom.style.transform = transformBottom
      this.applyFadeStyleOffset(this.faderNodeBottom)
    }

    if (fadeLeft && this.faderNodeLeft) {
      const transformLeft = getFadeLeftStyles(event, offset)
      this.faderNodeLeft.style.transform = transformLeft
      this.applyFadeStyleOffset(this.faderNodeLeft)
    }

    if (fadeRight && this.faderNodeRight) {
      const transformRight = getFadeRightStyles(event, offset)
      this.faderNodeRight.style.transform = transformRight
      this.applyFadeStyleOffset(this.faderNodeRight)
    }
  }

  applyFadeStyleOffset(node) {
    /* istanbul ignore else */
    // Guard, just in case the node element is removed.
    if (node) {
      const offset = `${this.containerNode.offsetWidth -
        this.containerNode.scrollWidth}px`
      node.style.right = offset
    }
  }

  handleOnScroll = event => {
    this.applyFadeStyles(event)
    this.props.onScroll(event)
  }

  setFaderNodeTopNode = node => (this.faderNodeTop = node)
  setFaderNodeLeftNode = node => (this.faderNodeLeft = node)
  setFaderNodeBottomNode = node => (this.faderNodeBottom = node)
  setFaderNodeRightNode = node => (this.faderNodeRight = node)
  setContainerNode = node => {
    this.containerNode = node
    this.props.scrollableRef(node)
  }

  renderFaderTop() {
    const { backgroundColor, fade, rounded } = this.props

    if (!fade) return null

    const componentClassName = classNames(
      'c-Scrollable__fader',
      'is-top',
      rounded && 'is-rounded'
    )

    return (
      <FaderUI
        className={componentClassName}
        innerRef={this.setFaderNodeTopNode}
        role="presentation"
        style={{
          color: backgroundColor,
        }}
      />
    )
  }

  renderFaderLeft() {
    const { backgroundColor, fadeLeft, fadeRight, rounded } = this.props

    if (!fadeLeft) return
    const componentClassName = classNames('c-Scrollable__fader', 'is-left')

    return (
      <FaderUI
        fadeSides={fadeLeft || fadeRight}
        rounded={rounded}
        className={componentClassName}
        innerRef={this.setFaderNodeLeftNode}
        role="presentation"
        style={{
          color: backgroundColor,
        }}
      />
    )
  }

  renderFaderRight() {
    const { backgroundColor, fadeRight, fadeLeft, rounded } = this.props

    if (!fadeRight) return

    const componentClassName = classNames('c-Scrollable__fader', 'is-right')

    return (
      <FaderUI
        fadeSides={fadeLeft || fadeRight}
        rounded={rounded}
        className={componentClassName}
        innerRef={this.setFaderNodeRightNode}
        role="presentation"
        style={{
          color: backgroundColor,
        }}
      />
    )
  }

  renderFaderBottom() {
    const { backgroundColor, fadeBottom, rounded } = this.props

    if (!fadeBottom) return null

    const componentClassName = classNames(
      'c-Scrollable__fader',
      'is-bottom',
      rounded && 'is-rounded'
    )

    return (
      <FaderUI
        className={componentClassName}
        innerRef={this.setFaderNodeBottomNode}
        role="presentation"
        style={{
          color: backgroundColor,
          transform: 'scaleY(1)',
        }}
      />
    )
  }

  renderContent() {
    const {
      children,
      contentClassName,
      fade,
      fadeLeft,
      fadeRight,
      isScrollLocked,
    } = this.props

    const componentClassName = classNames(
      'c-ScrollableNode',
      'c-Scrollable__content',
      contentClassName
    )

    return (
      <ContentUI
        fade={fade}
        fadeSides={fadeLeft || fadeRight}
        isScrollLocked={isScrollLocked}
        className={componentClassName}
        onScroll={this.handleOnScroll}
        innerRef={this.setContainerNode}
      >
        {children}
      </ContentUI>
    )
  }

  render() {
    const {
      backgroundColor,
      children,
      className,
      contentClassName,
      fade,
      fadeBottom,
      innerRef,
      onScroll,
      rounded,
      scrollableRef,
      isScrollLocked,
      fadeLeft,
      fadeRight,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Scrollable',
      fade && 'has-fade',
      rounded && 'is-rounded',
      className
    )

    return (
      <ScrollableUI
        {...getValidProps(rest)}
        fadeSides={fadeLeft || fadeRight}
        className={componentClassName}
        innerRef={innerRef}
      >
        {(fadeLeft || fadeRight) && (
          <EventListener
            event="resize"
            handler={() => {
              this.applyFade()
            }}
          />
        )}
        {this.renderFaderLeft()}
        {this.renderFaderTop()}
        <ScrollLock isDisabled={!isScrollLocked}>
          {this.renderContent()}
        </ScrollLock>
        {this.renderFaderRight()}
        {this.renderFaderBottom()}
      </ScrollableUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Scrollable)

export default PropConnectedComponent
