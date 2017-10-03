// See:
// https://github.com/Shopify/polaris/blob/master/src/components/KeypressListener/KeypressListener.tsx

import { Component } from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utilities/other'
import { addEventListener, removeEventListener } from '@shopify/javascript-utilities/events'

export const propTypes = {
  keyCode: PropTypes.number,
  handler: PropTypes.func,
  modifier: PropTypes.string,
  only: PropTypes.bool,
  type: PropTypes.oneOf(['keyup', 'keypress', 'keydown'])
}

const defaultProps = {
  handler: noop,
  type: 'keyup'
}

class KeypressListener extends Component {
  constructor () {
    super()
    this.handleKeyEvent = this.handleKeyEvent.bind(this)
  }

  componentDidMount () {
    const node = document
    addEventListener(node, this.props.type, this.handleKeyEvent)
  }

  componentWillUnmount () {
    const node = document
    removeEventListener(node, this.props.type, this.handleKeyEvent)
  }

  handleKeyEvent (event) {
    const {keyCode, handler, modifier, only} = this.props
    let modKey = true

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
    } else if (only) {
      modKey =  event.shiftKey === false && 
                event.altKey === false &&
                event.metaKey === false &&
                event.ctrlKey === false
    }

    if (event.keyCode === keyCode && modKey) {
      handler(event)
    }
  }

  render () {
    return null
  }
}

KeypressListener.propTypes = propTypes
KeypressListener.defaultProps = defaultProps

export default KeypressListener
