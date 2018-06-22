// @flow
import React from 'react'
import ThemeProvider from '../ThemeProvider'
import { providerContextTypes } from './propTypes'

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

export default Provider
