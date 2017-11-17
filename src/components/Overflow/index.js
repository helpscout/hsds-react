import React, {PureComponent as Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import EventListener from '../EventListener'
import classNames from '../../utilities/classNames'
import { hasContentOverflowX } from '../../utilities/node'
import { noop, requestAnimationFrame } from '../../utilities/other'

export const propTypes = {
  backgroundColor: PropTypes.string,
  isScrollable: PropTypes.bool,
  onWheel: PropTypes.func,
  style: PropTypes.object
}

const defaultProps = {
  isScrollable: true,
  onWheel: noop,
  style: {}
}

class Overflow extends Component {
  constructor () {
    super()
    this.state = {
      faded: false
    }
    this.faderSize = 32
    this.faderNodeLeft = null
    this.faderNodeRight = null
    this.containerNode = null
    this.applyFade = this.applyFade.bind(this)
    this.onContainerScroll = this.onContainerScroll.bind(this)
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
      faded: hasContentOverflowX(containerNode)
    })

    node.style.height = height ? `${height - heightOffset}px` : null
  }

  onContainerScroll (event) {
    const { onWheel } = this.props
    const scrollNode = event.currentTarget
    const offset = this.faderSize
    const { clientWidth, scrollWidth, scrollLeft } = scrollNode
    const scrollAmount = clientWidth + scrollLeft + offset

    requestAnimationFrame(() => {
      if (scrollLeft > 0) {
        const size = scrollLeft < offset ? scrollLeft : offset
        this.faderNodeLeft.style.transform = `scaleX(${size / offset})`
      } else {
        this.faderNodeLeft.style.transform = `scaleX(0)`
      }

      if (scrollAmount >= scrollWidth) {
        const amount = ((offset - (-1 * (scrollWidth - scrollAmount))) / offset)
        this.faderNodeRight.style.transform = `scaleX(${amount})`
      } else {
        this.faderNodeRight.style.transform = `scaleX(1)`
      }
    })

    onWheel(event)
  }

  render () {
    const {
      backgroundColor,
      className,
      children,
      isScrollable,
      onWheel,
      ...rest
    } = this.props

    const { faded } = this.state
    const applyFade = this.applyFade
    const onContainerScroll = this.onContainerScroll

    const componentClassName = classNames(
      'c-Overflow',
      faded && 'is-faded',
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
          transform: faded ? 'scaleX(1)' : 'scaleX(0)'
        }}
      />
    )

    return (
      <div className={componentClassName} {...rest}>
        {faderLeftMarkup}
        <div
          className='c-Overflow__container'
          ref={node => (this.containerNode = node)}
          onWheel={isScrollable ? onContainerScroll : onWheel}
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
