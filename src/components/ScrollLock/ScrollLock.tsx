import * as React from 'react'
import { noop } from '../../utilities/other'
import propConnect from '../PropProvider/propConnect'
import { COMPONENT_KEY, handleWheelEvent } from './ScrollLock.utils'

type Props = {
  children?: any
  direction: 'x' | 'y'
  isDisabled: boolean
  stopPropagation: boolean
  onWheel: (event: any) => void
}

export class ScrollLock extends React.PureComponent<Props> {
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
      onWheel: (event: any) => {
        handleWheelEvent(event, direction, stopPropagation)
        onWheel(event)
        if (child.props.onWheel) child.props.onWheel(event)
      },
    }

    return isDisabled ? child : React.cloneElement(child, events)
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(ScrollLock)

export default PropConnectedComponent
