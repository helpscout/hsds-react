import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { handleWheelEvent } from './ScrollLock.utils'
import { isSafari } from '../../utilities/browser'

export class ScrollLock extends React.PureComponent {
  componentDidMount() {
    if (isSafari() && this.canRender()) {
      this.node = ReactDOM.findDOMNode(this)

      if (this.node) {
        this.node.addEventListener('wheel', this.handleWheelEvent)
      }
    }
  }

  componentWillUnmount() {
    if (isSafari() && this.node) {
      this.node.removeEventListener('wheel', this.handleWheelEvent)
    }
  }

  canRender() {
    return !!this.props.children
  }

  handleWheelEvent = event => {
    const { direction, isDisabled, onWheel, stopPropagation } = this.props
    onWheel(event)

    if (isDisabled) return

    handleWheelEvent(event, direction, stopPropagation)
  }

  render() {
    if (!this.canRender()) return null
    const { direction, isDisabled } = this.props
    const child = React.Children.only(this.props.children)

    if (child && !isDisabled) {
      const style = child.props.style || {}
      const overscrollStyles = {
        overscrollBehaviorY: direction === 'y' ? 'contain' : 'auto',
        overscrollBehaviorX: direction === 'x' ? 'contain' : 'auto',
      }

      return React.cloneElement(React.Children.only(this.props.children), {
        style: { ...overscrollStyles, ...style },
      })
    }

    return child
  }
}

ScrollLock.defaultProps = {
  isDisabled: false,
  direction: 'y',
  stopPropagation: false,
  onWheel: () => undefined,
}

ScrollLock.propTypes = {
  children: PropTypes.any,
  /** Disable the scroll locking behaviour, making the component a no-op. */
  isDisabled: PropTypes.bool,
  /** Determines the scroll lock direction. */
  direction: PropTypes.oneOf(['x', 'y']),
  /** Fires `event.stopPropagation()`. */
  stopPropagation: PropTypes.bool,
  /** Callback function when component is scrolled */
  onWheel: PropTypes.func,
}

export default ScrollLock
