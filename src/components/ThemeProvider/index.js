// @flow
import { Component } from 'react'
import PropTypes from 'prop-types'

type Props = {
  children?: any,
  theme: string,
}

class ThemeProvider extends Component<Props> {
  static defaultProps = {
    theme: 'default',
  }
  static childContextTypes = {
    theme: PropTypes.any,
  }

  getChildContext = () => {
    const { theme } = this.props
    return {
      theme,
    }
  }

  render() {
    return this.props.children
  }
}

export default ThemeProvider
