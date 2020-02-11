import React from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utilities/other'

class ThemeProvider extends React.PureComponent {
  static defaultProps = {
    theme: 'default',
  }
  static childContextTypes = {
    theme: noop,
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      theme: props.theme,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.theme !== this.state.theme) {
      this.setState({
        theme: nextProps.theme,
      })
    }
  }

  getChildContext = () => {
    return {
      theme: this.state.theme,
    }
  }

  render() {
    return this.props.children
  }
}

ThemeProvider.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.oneOfType([PropTypes.string, 'default']),
}

export default ThemeProvider
