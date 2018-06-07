// @flow
import React, { PureComponent as Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import EventListener from '../EventListener'
import classNames from '../../utilities/classNames'
import { hasContentOverflowX } from '../../utilities/node'
import {
  getFadeLeftStyles,
  getFadeRightStyles,
} from '../../utilities/scrollFade'
import { noop, requestAnimationFrame } from '../../utilities/other'

type Props = {
  backgroundColor?: string,
  className?: string,
  children?: any,
  initialHeightAdjustDelay?: number,
  isScrollable?: boolean,
  onScroll: (event: Event) => void,
  scrollableRef: (ref: ?HTMLElement) => void,
}

type State = {
  shouldFadeOnMount: boolean,
}

class Overflow extends Component<Props, State> {
  static defaultProps = {
    initialHeightAdjustDelay: 30,
    isScrollable: true,
    onScroll: noop,
    scrollableRef: noop,
  }

  state = {
    shouldFadeOnMount: false,
  }

  faderSize: number = 32
  faderNodeLeft: ?HTMLElement = null
  faderNodeRight: ?HTMLElement = null
  containerNode: ?HTMLElement = null

  componentDidMount() {
    const { initialHeightAdjustDelay } = this.props
    this.adjustHeight()
    /* istanbul ignore next */
    setTimeout(() => {
      /* istanbul ignore next */
      // Initial adjustHeight has been tested. Ignoring due to fragility
      // of JSDOM + timeouts.
      requestAnimationFrame(() => {
        this.adjustHeight()
      })
    }, initialHeightAdjustDelay)
  }

  adjustHeight = () => {
    const node = ReactDOM.findDOMNode(this)
    const containerNode = this.containerNode
    //$FlowFixMe
    const height = containerNode.clientHeight
    const heightOffset = 20

    this.setState({
      shouldFadeOnMount: hasContentOverflowX(containerNode),
    })

    /* istanbul ignore next */
    // JSDOM does not provide node.clientHeight, which prevents
    // us from testing this calculation
    //$FlowFixMe
    node.style.height = height ? `${height - heightOffset}px` : null
  }

  applyFadeStyles = (event: Event) => {
    const { isScrollable } = this.props
    const offset = this.faderSize

    if (!isScrollable) return

    const transformLeft = getFadeLeftStyles(event, offset)
    const transformRight = getFadeRightStyles(event, offset)

    requestAnimationFrame(() => {
      //$FlowFixMe
      this.faderNodeLeft.style.transform = transformLeft
      //$FlowFixMe
      this.faderNodeRight.style.transform = transformRight
    })
  }

  handleOnScroll = (event: Event) => {
    const { onScroll } = this.props
    this.applyFadeStyles(event)
    onScroll(event)
  }

  render() {
    const {
      backgroundColor,
      className,
      children,
      initialHeightAdjustDelay,
      isScrollable,
      onScroll,
      scrollableRef,
      ...rest
    } = this.props

    const { shouldFadeOnMount } = this.state
    const adjustHeight = this.adjustHeight
    const handleOnScroll = this.handleOnScroll

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
        role="presentation"
        style={{
          color: backgroundColor,
        }}
      />
    )

    const faderRightMarkup = (
      <div
        className="c-Overflow__fader is-right"
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
          ref={node => {
            this.containerNode = node
            scrollableRef(node)
          }}
          onScroll={handleOnScroll}
        >
          <div className="c-Overflow__content">{children}</div>
        </div>
        {faderRightMarkup}
        <EventListener event="resize" handler={adjustHeight} />
      </div>
    )
  }
}

export default Overflow
