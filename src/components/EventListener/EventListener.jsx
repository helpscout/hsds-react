import React from 'react'
import PropTypes from 'prop-types'
import { getClosestDocument } from '../../utilities/node'
import { addEventListener, removeEventListener } from '../../utilities/events'
import { noop } from '../../utilities/other'

// see https://github.com/oliviertassinari/react-event-listener/
class EventListener extends React.Component {
  static propTypes = {
    event: PropTypes.string,
    capture: PropTypes.bool,
    passive: PropTypes.bool,
    handler: PropTypes.func,
    scope: PropTypes.any,
  }

  static defaultProps = {
    handler: noop,
    scope: window,
  }

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

export default EventListener
