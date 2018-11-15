// Modified version of:
// https://github.com/Shopify/polaris/blob/master/src/components/KeypressListener/KeypressListener.tsx

import * as React from 'react'
import { addEventListener, removeEventListener } from '../../utilities/events'
import { getClosestDocument } from '../../utilities/node'
import { noop } from '../../utilities/other'
import { isDefined } from '../../utilities/is'

export interface Props {
  keyCode?: number
  handler: (event: KeyboardEvent) => void
  modifier?: string
  noModifier: boolean
  scope: HTMLElement | Document | Window
  type: 'keyup' | 'keypress' | 'keydown'
}

class KeypressListener extends React.Component<Props> {
  static defaultProps = {
    handler: noop,
    noModifier: true,
    scope: document,
    type: 'keyup',
  }

  node: HTMLElement
  scope: HTMLElement | Document | Window

  componentDidMount() {
    const { scope, type } = this.props
    this.scope = scope === document ? getClosestDocument(this.node) : scope

    addEventListener(this.scope, type, this.handleKeyEvent)
  }

  componentWillUnmount() {
    removeEventListener(this.scope, this.props.type, this.handleKeyEvent)
  }

  shouldComponentUpdate() {
    return false
  }

  handleKeyEvent = (event: KeyboardEvent) => {
    const { keyCode, handler, modifier, noModifier } = this.props
    let modKey = true

    if (!isDefined(keyCode)) {
      return handler(event)
    }

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

export default KeypressListener
