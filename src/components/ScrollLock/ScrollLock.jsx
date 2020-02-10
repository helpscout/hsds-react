import React from 'react'
import PropTypes from 'prop-types'
import * as ReactDOM from 'react-dom'
import { noop } from '../../utilities/other'
import { handleWheelEvent } from './ScrollLock.utils'

export interface Props {
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
  node: Element | null

  componentDidMount() {
    if (this.canRender()) {
      this.node = ReactDOM.findDOMNode(this) as Element
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

  handleWheelEvent = (event: any) => {
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

export default ScrollLock
