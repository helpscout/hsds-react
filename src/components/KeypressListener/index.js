// See:
// https://github.com/Shopify/polaris/blob/master/src/components/KeypressListener/KeypressListener.tsx

import { Component } from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utilities/other'
import { addEventListener, removeEventListener } from '@shopify/javascript-utilities/events'

export const propTypes = {
  keyCode: PropTypes.number,
  handler: PropTypes.func,
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
    const {keyCode, handler} = this.props

    if (event.keyCode === keyCode) {
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
