// Modified version of:
// https://github.com/Shopify/polaris/blob/master/src/components/KeypressListener/KeypressListener.tsx

import React from 'react'
import PropTypes from 'prop-types'
import { getClosestDocument } from '../../utilities/node'
import { isDefined } from '../../utilities/is'

class KeypressListener extends React.Component {
  node
  scope

  componentDidMount() {
    const { scope, type } = this.props
    this.scope = scope === document ? getClosestDocument(this.node) : scope

    if (this.scope) {
      this.scope.addEventListener(type, this.handleKeyEvent)
    }
  }

  componentWillUnmount() {
    if (this.scope) {
      this.scope.removeEventListener(this.props.type, this.handleKeyEvent)
    }
  }

  shouldComponentUpdate() {
    return false
  }

  handleKeyEvent = event => {
    const { keyCode, handler, modifier, noModifier } = this.props
    let modKey = true

    if (!isDefined(keyCode)) {
      return handler(event)
    }

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

        default:
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

  setNodeRef = node => (this.node = node)

  render() {
    return <div className="c-KeypressListenerRoot" ref={this.setNodeRef} />
  }
}

function noop() {}

KeypressListener.defaultProps = {
  handler: noop,
  noModifier: true,
  scope: document,
  type: 'keyup',
}

KeypressListener.propTypes = {
  /** Number corresponding to the keyCode. */
  keyCode: PropTypes.number,
  /** Callback when the keyCode is pressed. */
  handler: PropTypes.func,
  /** Keyboard modifier to listen to in addition to `keyCode`. */
  modifier: PropTypes.string,
  /** Listen for `keyCode` only. */
  noModifier: PropTypes.bool,
  /** Node element to capture the event */
  scope: PropTypes.any,
  /** Type of key event. */
  type: PropTypes.oneOf(['keyup', 'keypress', 'keydown']),
}

export default KeypressListener
