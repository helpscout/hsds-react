import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'

export const propTypes = {
  isDisabled: PropTypes.bool
}
const defaultProps = {
  isDisabled: false
}

class ScrollLock extends Component {
  render () {
    const { children, isDisabled } = this.props

    if (!children) {
      return null
    }

    const child = React.Children.only(children)
    const events = {
      onWheel: handleWheelEvent
    }

    return isDisabled ? child : React.cloneElement(child, events)
  }
}

function handleWheelEvent (event) {
  const scrollNode = event.currentTarget
  const { clientHeight, scrollHeight, scrollTop } = scrollNode
  const { deltaY } = event

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
