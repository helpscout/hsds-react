import * as React from 'react'
import * as ReactDOM from 'react-dom'
import EventListener from '../EventListener'
import styled from '../styled'
import { classNames } from '../../utilities/classNames'
import { remapScrollingPlane } from '../../utilities/scrolling'
import { smoothScrollTo } from '../../utilities/smoothScroll'
import { hasContentOverflowX } from '../../utilities/node'
import {
  getFadeLeftStyles,
  getFadeRightStyles,
} from '../../utilities/scrollFade'
import { noop, requestAnimationFrame } from '../../utilities/other'
import css from './styles/Overflow.css'

type Props = {
  backgroundColor?: string
  className?: string
  children?: any
  refApplyFade: (...args: any[]) => void
  refScrollToEnd: (...args: any[]) => void
  initialHeightAdjustDelay?: number
  isScrollable?: boolean
  onScroll: (event: Event) => void
  onWheel: (event: Event) => void
  remapScrollDirections: boolean
  scrollableRef: (ref?: HTMLElement) => void
  scrollOnClickFade: boolean
}

type State = {
  shouldFadeOnMount: boolean
}

export class Overflow extends React.PureComponent<Props, State> {
  static defaultProps = {
    initialHeightAdjustDelay: 30,
    isScrollable: true,
    onScroll: noop,
    onWheel: noop,
    refApplyFade: noop,
    refScrollToEnd: noop,
    remapScrollDirections: false,
    scrollableRef: noop,
    scrollOnClickFade: true,
  }

  state = {
    shouldFadeOnMount: false,
  }

  _isMounted: boolean = false
  faderSize: number = 32
  faderNodeLeft: HTMLElement | null
  faderNodeRight: HTMLElement | null
  containerNode: HTMLElement | null
  node: Element | Text | null
  scrollAmount = 0.7
  smoothScrollDuration = 200

  componentDidMount = () => {
    this._isMounted = true

    this.setNodes()
    this.handleOnResize()
    this.bindPropMethods()
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  setNodes = () => {
    if (this.node || !this._isMounted) return

    this.node = ReactDOM.findDOMNode(this)
  }

  bindPropMethods = () => {
    this.props.refApplyFade(this.handleOnResize)
    this.props.refScrollToEnd(this.scrollToEnd)
  }

  adjustHeight = () => {
    if (!this._isMounted || !this.node) return

    const containerNode = this.containerNode
    const height = containerNode && containerNode.clientHeight
    const heightOffset = 20

    this.setState({
      shouldFadeOnMount: hasContentOverflowX(containerNode),
    })

    /* istanbul ignore next */
    // JSDOM does not provide node.clientHeight, which prevents
    // us from testing this calculation
    // TODO: fix typescript complains
    // @ts-ignore
    this.node.style.height = height ? `${height - heightOffset}px` : null
  }

  applyFadeStyles = (event: Event | Object) => {
    const { isScrollable } = this.props
    const offset = this.faderSize

    if (!isScrollable) return

    const transformLeft = getFadeLeftStyles(event, offset)
    const transformRight = getFadeRightStyles(event, offset)

    requestAnimationFrame(() => {
      // TODO: fix typescript complains
      // @ts-ignore
      this.faderNodeLeft.style.transform = transformLeft
      // TODO: fix typescript complains
      // @ts-ignore
      this.faderNodeRight.style.transform = transformRight
    })
  }

  handleOnScroll = event => {
    const { onScroll } = this.props
    this.applyFadeStyles(event)
    onScroll(event)
  }

  handleOnResize = () => {
    /* istanbul ignore next */
    // Initial adjustHeight has been tested. Ignoring due to fragility
    // of JSDOM + timeouts.
    requestAnimationFrame(() => {
      this.adjustHeight()
      this.applyFadeStyles({
        currentTarget: this.containerNode,
      })
    })
  }

  /**
   * Remaps vertical scrolling to horizontal scrolling. This provides a more
   * intuitive experience for mouse users during an Overflow.
   *
   * @param   {WheelEvent} event
   */
  /* istanbul ignore next */
  remapScrollDirections = event => {
    /* istanbul ignore next */
    if (this.props.remapScrollDirections) {
      remapScrollingPlane(event)
    }
    this.props.onWheel(event)
  }

  /**
   * Scrolls the Overflow container to the left.
   */
  scrollLeft = () => {
    if (!this.props.scrollOnClickFade) return

    // TODO: fix typescript complains
    // @ts-ignore
    const currentScrollAmount = this.containerNode.scrollLeft
    // TODO: fix typescript complains
    // @ts-ignore
    const scrollAmount = this.containerNode.clientWidth * this.scrollAmount
    const scrollValue = currentScrollAmount - scrollAmount

    this.scrollContainerView(scrollValue)
  }

  /**
   * Scrolls the Overflow container to the right.
   */
  scrollRight = () => {
    if (!this.props.scrollOnClickFade) return

    // TODO: fix typescript complains
    // @ts-ignore
    const currentScrollAmount = this.containerNode.scrollLeft
    // TODO: fix typescript complains
    // @ts-ignore
    const scrollAmount = this.containerNode.clientWidth * this.scrollAmount
    const scrollValue = currentScrollAmount + scrollAmount

    this.scrollContainerView(scrollValue)
  }

  /**
   * Scrolls the Overflow container to the end (right).
   */
  scrollToEnd = () => {
    /* istanbul ignore next */
    if (!this.containerNode) return
    const scrollValue = this.containerNode.scrollWidth

    this.scrollContainerView(scrollValue)
  }

  /**
   * Scrolls the container view by a specified amount (px).
   *
   * @param {number} amount The amount to scroll by.
   */
  /* istanbul ignore next */
  scrollContainerView = (amount: number = 0) => {
    /* istanbul ignore next */
    if (!this.containerNode) return

    /* istanbul ignore next */
    // Cannot be reliably + neatly tested in JSDOM.
    smoothScrollTo({
      node: this.containerNode,
      position: amount,
      direction: 'x',
      duration: this.smoothScrollDuration,
      callback: undefined,
    })
  }

  render() {
    const {
      backgroundColor,
      className,
      children,
      refApplyFade,
      refScrollToEnd,
      initialHeightAdjustDelay,
      isScrollable,
      onScroll,
      remapScrollDirections,
      scrollableRef,
      scrollOnClickFade,
      onWheel,
      ...rest
    } = this.props

    const { shouldFadeOnMount } = this.state

    const componentClassName = classNames(
      'c-Overflow',
      shouldFadeOnMount && 'is-faded',
      isScrollable && 'is-scrollable',
      className
    )

    const faderLeftMarkup = (
      <div
        className="c-Overflow__fader is-left"
        ref={node => (this.faderNodeLeft = node)}
        onClick={this.scrollLeft}
        role="presentation"
        style={{
          color: backgroundColor,
        }}
      />
    )

    const faderRightMarkup = (
      <div
        className="c-Overflow__fader is-right"
        onClick={this.scrollRight}
        ref={node => (this.faderNodeRight = node)}
        role="presentation"
        style={{
          color: backgroundColor,
          transform: shouldFadeOnMount ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />
    )

    return (
      <div className={componentClassName} {...rest}>
        {faderLeftMarkup}
        <div
          className="c-Overflow__container"
          ref={(node: any) => {
            this.containerNode = node
            scrollableRef(node)
          }}
          onScroll={this.handleOnScroll}
          onWheel={this.remapScrollDirections}
        >
          <div className="c-Overflow__content">{children}</div>
        </div>
        {faderRightMarkup}
        <EventListener event="resize" handler={this.handleOnResize} />
      </div>
    )
  }
}

export default styled(Overflow)(css)
