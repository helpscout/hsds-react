import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utilities/other'

export const propTypes = {
  isDisabled: PropTypes.bool,
  direction: PropTypes.oneOf(['x', 'y']),
  stopPropagation: PropTypes.bool,
  onWheel: PropTypes.func
}
const defaultProps = {
  isDisabled: false,
  direction: 'y',
  stopPropagation: false,
  onWheel: noop
}

class ScrollLock extends Component {
  render () {
    const {
      children,
      direction,
      isDisabled,
      onWheel,
      stopPropagation
    } = this.props

    if (!children) {
      return null
    }

    const child = React.Children.only(children)
    const events = {
      onWheel: event => {
        handleWheelEvent(event, direction, stopPropagation)
        onWheel(event)
        if (child.props.onWheel) child.props.onWheel(event)
      }
    }

    return isDisabled ? child : React.cloneElement(child, events)
  }
}

function handleWheelEvent (event, direction, stopPropagation) {
  if (direction === 'x') {
    return scrollLockX(event, stopPropagation)
  } else {
    return scrollLockY(event, stopPropagation)
  }
}

function scrollLockX (event, stopPropagation) {
  const { deltaX } = event
  const scrollNode = event.currentTarget
  const { clientWidth, scrollWidth, scrollLeft } = scrollNode

  if (stopPropagation) {
    event.stopPropagation()
  }

  if (deltaX > 0 && deltaX > scrollWidth - clientWidth - scrollLeft) {
    scrollNode.scrollLeft = scrollWidth
    event.preventDefault()
  } else if (deltaX <= 0 && -deltaX > scrollLeft) {
    scrollNode.scrollLeft = 0
    event.preventDefault()
  }
}

function scrollLockY (event, stopPropagation) {
  const scrollNode = event.currentTarget
  const { clientHeight, scrollHeight, scrollTop } = scrollNode
  const { deltaY } = event

  if (stopPropagation) {
    event.stopPropagation()
  }

  if (deltaY > 0 && deltaY > scrollHeight - clientHeight - scrollTop) {
    scrollNode.scrollTop = scrollHeight
    event.preventDefault()
  } else if (deltaY <= 0 && -deltaY > scrollTop) {
    scrollNode.scrollTop = 0
    event.preventDefault()
  }
}

ScrollLock.propTypes = propTypes
ScrollLock.defaultProps = defaultProps

export default ScrollLock
