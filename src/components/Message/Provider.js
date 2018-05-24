import React from 'react'
import ThemeProvider from '../ThemeProvider'
import { providerContextTypes } from './propTypes'

const propTypes = providerContextTypes

const defaultProps = {
  theme: 'admin',
}

const childContextTypes = providerContextTypes

class Provider extends ThemeProvider {
  render() {
    const { children } = this.props

    return <div className="c-MessageProvider">{children}</div>
  }
}

Provider.propTypes = propTypes
Provider.defaultProps = defaultProps
Provider.childContextTypes = childContextTypes
Provider.displayName = 'MessageProvider'

export default Provider
