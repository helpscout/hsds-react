// @flow
import React from 'react'
import ThemeProvider from '../ThemeProvider'
import { namespaceComponent } from '../../utilities/component'
import { providerContextTypes } from './propTypes'
import { COMPONENT_KEY } from './utils'

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
