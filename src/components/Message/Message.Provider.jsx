import React from 'react'
import PropTypes from 'prop-types'
import SimpleThemeProvider from '../SimpleThemeProvider'
import { noop } from '../../utilities/other'

class MessageProvider extends SimpleThemeProvider {
  render() {
    return <div className="c-MessageProvider">{this.props.children}</div>
  }
}

MessageProvider.propTypes = {
  theme: PropTypes.any,
}

MessageProvider.defaultProps = {
  theme: 'admin',
}

MessageProvider.childContextTypes = {
  theme: noop,
}

export default MessageProvider
