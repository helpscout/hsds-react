import React from 'react'
import PropTypes from 'prop-types'
import SimpleThemeProvider from '../SimpleThemeProvider'

class MessageProvider extends SimpleThemeProvider {
  render() {
    return <div className="c-MessageProvider">{this.props.children}</div>
  }
}

MessageProvider.defaultProps = {
  theme: 'admin',
}

MessageProvider.childContextTypes = {
  theme: () => undefined,
}

MessageProvider.propTypes = {
  theme: PropTypes.any,
}

export default MessageProvider
