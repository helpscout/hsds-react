import React, {PureComponent as Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import EventListener from '../EventListener'
import classNames from '../../utilities/classNames'
import { hasContentOverflow } from '../../utilities/node'
import { noop } from '../../utilities/other'

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
    this.faderWidth = 32
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
      faded: hasContentOverflow(containerNode)
    })

    node.style.height = height ? `${height - heightOffset}px` : null
  }

  onContainerScroll (event) {
    const { onWheel } = this.props
    const scrollNode = event.currentTarget
    const offset = this.faderWidth
    const { clientWidth, scrollWidth, scrollLeft } = scrollNode
    const scrollAmount = clientWidth + scrollLeft + offset

    if (scrollLeft > 0) {
      const size = scrollLeft < offset ? scrollLeft : offset
      this.faderNodeLeft.style.width = `${size}px`
    } else {
      this.faderNodeLeft.style.width = `0px`
    }

    if (scrollAmount >= scrollWidth) {
      this.faderNodeRight.style.width = `${offset + (scrollWidth - scrollAmount)}px`
    } else {
      this.faderNodeRight.style.width = `${offset}px`
    }

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
          color: backgroundColor,
          width: 0
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
          width: faded ? this.faderWidth : 0
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
