import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import ScrollLock from '../ScrollLock'
import { classNames } from '../../utilities/classNames'
import {
  getFadeTopStyles,
  getFadeBottomStyles,
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
    faderSize: 28,
    innerRef: noop,
    onScroll: noop,
    scrollableRef: noop,
    isScrollLocked: true,
  }

  faderNodeTop: HTMLElement
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
    const { fade, faderSize: offset, fadeBottom } = this.props

    if (!fade && !fadeBottom) return

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
  setFaderNodeBottomNode = node => (this.faderNodeBottom = node)
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
    const { children, contentClassName } = this.props

    const componentClassName = classNames(
      'c-ScrollableNode',
      'c-Scrollable__content',
      contentClassName
    )

    return (
      <ContentUI
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
        className={componentClassName}
        innerRef={innerRef}
      >
        {this.renderFaderTop()}
        <ScrollLock isDisabled={!isScrollLocked}>
          {this.renderContent()}
        </ScrollLock>
        {this.renderFaderBottom()}
      </ScrollableUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Scrollable)

export default PropConnectedComponent
