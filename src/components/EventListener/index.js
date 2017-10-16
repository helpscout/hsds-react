import {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import {addEventListener, removeEventListener} from '@shopify/javascript-utilities/events'

const propTypes = {
  event: PropTypes.string,
  capture: PropTypes.bool,
  passive: PropTypes.bool,
  handler: PropTypes.func
}

const defaultProps = {
  scope: window
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

  /* istanbul ignore next */
  componentWillUpdate () {
    this.detachListener()
  }

  /* istanbul ignore next */
  componentDidUpdate () {
    this.attachListener()
  }

  componentWillUnmount () {
    this.detachListener()
  }

  attachListener () {
    const {event, handler, capture, passive, scope} = this.props
    addEventListener(scope, event, handler, {capture, passive})
  }

  detachListener () {
    const {event, handler, capture, scope} = this.props
    removeEventListener(scope, event, handler, capture)
  }

  render () {
    return null
  }
}

EventListener.propTypes = propTypes
EventListener.defaultProps = defaultProps

export default EventListener
