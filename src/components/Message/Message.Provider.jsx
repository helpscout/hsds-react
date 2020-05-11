import React from 'react'
import PropTypes from 'prop-types'
import ThemeProvider from '../ThemeProvider'

import { noop } from '../../utilities/other'

class Provider extends ThemeProvider {
  static propTypes = {
    theme: PropTypes.any,
  }

  static defaultProps = {
    theme: 'admin',
  }
  static childContextTypes = {
    theme: noop,
  }
  static displayName = 'MessageProvider'

  render() {
    return <div className="c-MessageProvider">{this.props.children}</div>
  }
}

export default Provider
