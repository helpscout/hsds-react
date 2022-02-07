import React from 'react'
import PropTypes from 'prop-types'
import { getClosestDocument } from '../../utilities/node'
import { addEventListener, removeEventListener } from '../../utilities/events'

// see https://github.com/oliviertassinari/react-event-listener/
class EventListener extends React.Component {
  node
  scope

  componentDidMount() {
    this.setInternalScopeFromProps(this.props)
    this.attachListener()
  }

  UNSAFE_componentWillUpdate() {
    this.detachListener()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.scope !== this.props.scope) {
      this.detachListener()
      this.setInternalScopeFromProps(this.props)
    }
    this.attachListener()
  }

  componentWillUnmount() {
    this.detachListener()
  }

  setInternalScopeFromProps = props => {
    const { scope } = props

    let _document = document
    let internalScope = scope

    if (scope === document) {
      _document = getClosestDocument(this.node)
      internalScope = _document
    }
    if (scope === document.body) {
      internalScope = _document.body
    }

    this.scope = internalScope
  }

  attachListener = () => {
    const { event, handler, capture, passive } = this.props

    event.split(' ').forEach(eventType => {
      addEventListener(this.scope, eventType, handler, { capture, passive })
    })
  }

  detachListener = () => {
    const { event, handler, capture } = this.props
    event.split(' ').forEach(eventType => {
      removeEventListener(this.scope, eventType, handler, capture)
    })
  }

  setNodeRef = node => (this.node = node)

  render() {
    return <div className="c-EventListenerRoot" ref={this.setNodeRef} />
  }
}

EventListener.defaultProps = {
  handler: () => undefined,
  scope: window,
}

EventListener.propTypes = {
  /** A Javascript event. */
  event: PropTypes.string,
  /** Callback when the event is triggered. */
  handler: PropTypes.func,
  /** Node element to capture the event. Default is `window`. */
  scope: PropTypes.any,
  /** indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree */
  capture: PropTypes.bool,
  /** indicates that the function specified by listener will never call preventDefault() */
  passive: PropTypes.bool,
}

export default EventListener
