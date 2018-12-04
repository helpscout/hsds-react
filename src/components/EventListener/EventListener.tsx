import * as React from 'react'
import { getClosestDocument } from '../../utilities/node'
import { addEventListener, removeEventListener } from '../../utilities/events'
import { noop } from '../../utilities/other'

type GeneralEvent = Event | MouseEvent | KeyboardEvent
type ScopeNode = HTMLElement | Document | Window

export interface Props {
  event: string
  capture?: boolean
  passive?: boolean
  handler: (event: GeneralEvent) => void
  scope: ScopeNode
}

// see https://github.com/oliviertassinari/react-event-listener/
class EventListener extends React.Component<Props> {
  static defaultProps = {
    handler: noop,
    scope: window,
  }

  node: HTMLElement
  scope: ScopeNode

  componentDidMount() {
    this.setInternalScopeFromProps(this.props)
    this.attachListener()
  }

  /* istanbul ignore next */
  componentWillUpdate() {
    this.detachListener()
  }

  /* istanbul ignore next */
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

  setInternalScopeFromProps = (props: Props) => {
    const { scope } = props
    this.scope = scope === document ? getClosestDocument(this.node) : scope
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
