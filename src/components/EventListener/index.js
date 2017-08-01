import {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import {addEventListener, removeEventListener} from '@shopify/javascript-utilities/events'

const propTypes = {
  event: PropTypes.string,
  capture: PropTypes.bool,
  passive: PropTypes.bool,
  handler: PropTypes.func
}

// see https://github.com/oliviertassinari/react-event-listener/
class EventListener extends Component {
  constructor () {
    super()
    this.attachListener = this.attachListener.bind(this)
    this.detachListener = this.detachListener.bind(this)
  }

  componentDidMount () {
    this.attachListener()
  }

  componentWillUpdate () {
    this.detachListener()
  }

  componentDidUpdate () {
    this.attachListener()
  }

  componentWillUnmount () {
    this.detachListener()
  }

  attachListener () {
    const {event, handler, capture, passive} = this.props
    addEventListener(window, event, handler, {capture, passive})
  }

  detachListener () {
    const {event, handler, capture} = this.props
    removeEventListener(window, event, handler, capture)
  }

  render () {
    return null
  }
}

EventListener.propTypes = propTypes

export default EventListener
