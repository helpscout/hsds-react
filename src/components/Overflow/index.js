import React, {PureComponent as Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import EventListener from '../EventListener'
import classNames from '../../utilities/classNames'
import { hasContentOverflowX } from '../../utilities/node'
import { getFadeLeftStyles, getFadeRightStyles } from '../../utilities/scrollFade'
import { noop, requestAnimationFrame } from '../../utilities/other'

export const propTypes = {
  backgroundColor: PropTypes.string,
  isScrollable: PropTypes.bool,
  onScroll: PropTypes.func,
  scrollableRef: PropTypes.func,
  style: PropTypes.object
}

const defaultProps = {
  isScrollable: true,
  onScroll: noop,
  scrollableRef: noop,
  style: {}
}

class Overflow extends Component {
  constructor () {
    super()
    this.state = {
      shouldFadeOnMount: false
    }
    this.faderSize = 32
    this.faderNodeLeft = null
    this.faderNodeRight = null
    this.containerNode = null
    this.applyFade = this.applyFade.bind(this)
    this.handleOnScroll = this.handleOnScroll.bind(this)
  }

  componentDidMount () {
    this.applyFade()
  }

  applyFade () {
    const node = ReactDOM.findDOMNode(this)
    const containerNode = this.containerNode
    const height = containerNode.clientHeight
    const heightOffset = 20

    this.setState({
      shouldFadeOnMount: hasContentOverflowX(containerNode)
    })

    /* istanbul ignore next */
    // JSDOM does not provide node.clientHeight, which prevents
    // us from testing this calculation
    node.style.height = height ? `${height - heightOffset}px` : null
  }

  applyFadeStyles (event) {
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

  handleOnScroll (event) {
    const { onScroll } = this.props
    this.applyFadeStyles(event)
    onScroll(event)
  }

  render () {
    const {
      backgroundColor,
      className,
      children,
      isScrollable,
      onScroll,
      scrollableRef,
      ...rest
    } = this.props

    const { shouldFadeOnMount } = this.state
    const applyFade = this.applyFade
    const handleOnScroll = this.handleOnScroll

    const componentClassName = classNames(
      'c-Overflow',
      shouldFadeOnMount && 'is-faded',
      isScrollable && 'is-scrollable',
      className
    )

    const faderLeftMarkup = (
      <div
        className='c-Overflow__fader is-left'
        ref={node => (this.faderNodeLeft = node)}
        role='presentation'
        style={{
          color: backgroundColor
        }}
      />
    )

    const faderRightMarkup = (
      <div
        className='c-Overflow__fader is-right'
        ref={node => (this.faderNodeRight = node)}
        role='presentation'
        style={{
          color: backgroundColor,
          transform: shouldFadeOnMount ? 'scaleX(1)' : 'scaleX(0)'
        }}
      />
    )

    return (
      <div className={componentClassName} {...rest}>
        {faderLeftMarkup}
        <div
          className='c-Overflow__container'
          ref={node => {
            this.containerNode = node
            scrollableRef(node)
          }}
          onScroll={handleOnScroll}
        >
          <div className='c-Overflow__content'>
            {children}
          </div>
        </div>
        {faderRightMarkup}
        <EventListener event='resize' handler={applyFade} />
      </div>
    )
  }
}

Overflow.propTypes = propTypes
Overflow.defaultProps = defaultProps

export default Overflow
