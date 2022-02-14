import React from 'react'
import PropTypes from 'prop-types'

function noop() {}

class SimpleThemeProvider extends React.PureComponent {
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

  UNSAFE_componentWillReceiveProps(nextProps) {
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

SimpleThemeProvider.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(['default'])]),
}

export default SimpleThemeProvider
