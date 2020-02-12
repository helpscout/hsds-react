import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { noop } from '../../utilities/other'
import { handleWheelEvent } from './ScrollLock.utils'

export class ScrollLock extends React.PureComponent {
  static defaultProps = {
    isDisabled: false,
    direction: 'y',
    stopPropagation: false,
    onWheel: noop,
  }

  componentDidMount() {
    if (this.canRender()) {
      this.node = ReactDOM.findDOMNode(this)
      /* istanbul ignore else */
      if (this.node) {
        this.node.addEventListener('wheel', this.handleWheelEvent)
      }
    }
  }

  componentWillUnmount() {
    if (this.node) {
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

    return React.Children.only(this.props.children)
  }
}

ScrollLock.propTypes = {
  children: PropTypes.any,
  direction: PropTypes.oneOf(['x', 'y']),
  isDisabled: PropTypes.bool,
  stopPropagation: PropTypes.bool,
  onWheel: PropTypes.func,
}

export default ScrollLock
