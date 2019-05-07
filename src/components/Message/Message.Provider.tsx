import * as React from 'react'
import ThemeProvider from '../ThemeProvider'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './Message.utils'

export type MessageProviderProps = {
  theme: any
  children: any
}

// TODO: fix typescript complains
// @ts-ignore
class Provider extends ThemeProvider<MessageProviderProps> {
  static defaultProps = {
    theme: 'admin',
  }
  static childContextTypes = {
    theme: noop,
  }
  static displayName = 'MessageProvider'

  render() {
    // TODO: fix typescript complains
    // @ts-ignore
    return <div className="c-MessageProvider">{this.props.children}</div>
  }
}

namespaceComponent(COMPONENT_KEY.Provider)(Provider)

export default Provider
