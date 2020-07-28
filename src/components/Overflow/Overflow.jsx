import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import EventListener from '../EventListener'
import { classNames } from '../../utilities/classNames'
import { remapScrollingPlane } from '../../utilities/scrolling'
import { smoothScrollTo } from '../../utilities/smoothScroll'
import { hasContentOverflowX } from '../../utilities/node'
import {
  getFadeLeftStyles,
  getFadeRightStyles,
} from '../../utilities/scrollFade'
import { noop, requestAnimationFrame } from '../../utilities/other'
import { OverflowUI } from './Overflow.css'

export class Overflow extends React.PureComponent {
  state = {
    shouldFadeOnMount: false,
  }

  _isMounted = false
  faderSize = 32
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

    // JSDOM does not provide node.clientHeight, which prevents
    // us from testing this calculation

    this.node.style.height = height ? `${height - heightOffset}px` : null
  }

  applyFadeStyles = event => {
    const { isScrollable } = this.props
    const offset = this.faderSize

    if (!isScrollable) return

    const transformLeft = getFadeLeftStyles(event, offset)
    const transformRight = getFadeRightStyles(event, offset)

    requestAnimationFrame(() => {
      this.faderNodeLeft.style.transform = transformLeft

      this.faderNodeRight.style.transform = transformRight
    })
  }

  handleOnScroll = event => {
    const { onScroll } = this.props
    this.applyFadeStyles(event)
    onScroll(event)
  }

  handleOnResize = () => {
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

  remapScrollDirections = event => {
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

    const currentScrollAmount = this.containerNode.scrollLeft

    const scrollAmount = this.containerNode.clientWidth * this.scrollAmount
    const scrollValue = currentScrollAmount - scrollAmount

    this.scrollContainerView(scrollValue)
  }

  /**
   * Scrolls the Overflow container to the right.
   */
  scrollRight = () => {
    if (!this.props.scrollOnClickFade) return

    const currentScrollAmount = this.containerNode.scrollLeft

    const scrollAmount = this.containerNode.clientWidth * this.scrollAmount
    const scrollValue = currentScrollAmount + scrollAmount

    this.scrollContainerView(scrollValue)
  }

  /**
   * Scrolls the Overflow container to the end (right).
   */
  scrollToEnd = () => {
    if (!this.containerNode) return
    const scrollValue = this.containerNode.scrollWidth

    this.scrollContainerView(scrollValue)
  }

  /**
   * Scrolls the container view by a specified amount (px).
   *
   * @param {number} amount The amount to scroll by.
   */

  scrollContainerView = (amount = 0) => {
    if (!this.containerNode) return

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
      <OverflowUI {...getValidProps(rest)} className={componentClassName}>
        {faderLeftMarkup}
        <div
          className="c-Overflow__container"
          ref={node => {
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
      </OverflowUI>
    )
  }
}

Overflow.defaultProps = {
  'data-cy': 'Overflow',
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

Overflow.propTypes = {
  /** Background color for the fade elements. */
  backgroundColor: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Amount of time (`ms`) to re-calculate the height on mount. Default `60`. */
  initialHeightAdjustDelay: PropTypes.number,
  /** Enables horizontal scrolling on overflow. Default is `true`. */
  isScrollable: PropTypes.bool,
  /** Callback function when component is scrolled. */
  onScroll: PropTypes.func,
  /** Retrieves the scrollable node. */
  scrollableRef: PropTypes.func,
  refApplyFade: PropTypes.func,
  refScrollToEnd: PropTypes.func,
  onWheel: PropTypes.func,
  remapScrollDirections: PropTypes.bool,
  scrollOnClickFade: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Overflow
