// Modified version of:
// https://github.com/Shopify/polaris/blob/master/src/components/KeypressListener/KeypressListener.tsx

import React, { PureComponent as Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events'
import { getClosestDocument } from '../../utilities/node'
import { noop } from '../../utilities/other'

export const propTypes = {
  keyCode: PropTypes.number,
  handler: PropTypes.func,
  modifier: PropTypes.string,
  noModifier: PropTypes.bool,
  type: PropTypes.oneOf(['keyup', 'keypress', 'keydown']),
}

const defaultProps = {
  handler: noop,
  noModifier: true,
  scope: document,
  type: 'keyup',
}

class KeypressListener extends Component {
  constructor() {
    super()
    this.handleKeyEvent = this.handleKeyEvent.bind(this)
    this.node = null
    this.scope = null
  }

  componentDidMount() {
    const { scope } = this.props
    this.node = ReactDOM.findDOMNode(this)
    this.scope = scope === document ? getClosestDocument(this.node) : scope

    addEventListener(this.scope, this.props.type, this.handleKeyEvent)
  }

  componentWillUnmount() {
    removeEventListener(this.scope, this.props.type, this.handleKeyEvent)

    this.node = null
    this.scope = null
  }

  shouldComponentUpdate() {
    return false
  }

  handleKeyEvent(event) {
    const { keyCode, handler, modifier, noModifier } = this.props
    let modKey = true

    /* istanbul ignore else */
    // Tested, but istanbul is being picky
    if (modifier) {
      switch (modifier) {
        case 'shift':
          modKey = event.shiftKey
          break
        case 'alt':
          modKey = event.altKey
          break
        case 'option':
          modKey = event.altKey
          break
        case 'meta':
          modKey = event.metaKey
          break
        case 'command':
          modKey = event.metaKey
          break
        case 'control':
          modKey = event.ctrlKey
          break
      }
    } else if (noModifier) {
      modKey =
        !event.shiftKey && !event.altKey && !event.metaKey && !event.ctrlKey
    }

    if (event.keyCode === keyCode && modKey) {
      handler(event)
    }
  }

  render() {
    return <div />
  }
}

KeypressListener.propTypes = propTypes
KeypressListener.defaultProps = defaultProps

export default KeypressListener
