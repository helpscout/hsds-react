import * as React from 'react'
import ThemeProvider from '../ThemeProvider'
import { namespaceComponent } from '../../utilities/component'
import { providerContextTypes } from './proptypes'
import { COMPONENT_KEY } from './Message.utils'

// TODO: fix typescript complains
// @ts-ignore
class Provider extends ThemeProvider {
  static propTypes = providerContextTypes
  static defaultProps = {
    theme: 'admin',
  }
  static childContextTypes = providerContextTypes
  static displayName = 'MessageProvider'

  render() {
    return <div className="c-MessageProvider">{this.props.children}</div>
  }
}

namespaceComponent(COMPONENT_KEY.Provider)(Provider)

export default Provider
