import React from 'react'
import PropTypes from 'prop-types'
import SimpleThemeProvider from '../SimpleThemeProvider'

class MessageProvider extends SimpleThemeProvider {
  render() {
    return <div className="c-MessageProvider">{this.props.children}</div>
  }
}

function noop() {}

MessageProvider.defaultProps = {
  theme: 'admin',
}

MessageProvider.childContextTypes = {
  theme: noop,
}

MessageProvider.propTypes = {
  theme: PropTypes.any,
}

export default MessageProvider
