// @flow
import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import { isFirefox } from '../../utilities/browser'
import { noop } from '../../utilities/other'

type ScrollWheelEvent = SyntheticWheelEvent<HTMLElement>

type Props = {
  children?: any,
  direction: 'x' | 'y',
  isDisabled: boolean,
  stopPropagation: boolean,
  onWheel: (event: ScrollWheelEvent) => void,
}

class ScrollLock extends Component<Props> {
  static defaultProps = {
    isDisabled: false,
    direction: 'y',
    stopPropagation: false,
    onWheel: noop,
  }

  render() {
    const {
      children,
      direction,
      isDisabled,
      onWheel,
      stopPropagation,
    } = this.props

    if (!children) {
      return null
    }

    const child = React.Children.only(children)
    const events = {
      onWheel: (event: ScrollWheelEvent) => {
        handleWheelEvent(event, direction, stopPropagation)
        onWheel(event)
        if (child.props.onWheel) child.props.onWheel(event)
      },
    }

    return isDisabled ? child : React.cloneElement(child, events)
  }
}

function handleWheelEvent(
  event: ScrollWheelEvent,
  direction: 'x' | 'y',
  stopPropagation: boolean
) {
  if (direction === 'x') {
    return scrollLockX(event, stopPropagation)
  } else {
    return scrollLockY(event, stopPropagation)
  }
}

export function scrollLockX(event: ScrollWheelEvent, stopPropagation: boolean) {
  // Disabled for Firefox
  /* istanbul ignore if */
  // Can't test this function in JSDOM
  if (isFirefox()) return
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

export function scrollLockY(event: ScrollWheelEvent, stopPropagation: boolean) {
  // Disabled for Firefox
  /* istanbul ignore if */
  // Can't test this function in JSDOM
  if (isFirefox()) return
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

export default ScrollLock
