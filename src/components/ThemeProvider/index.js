import {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  theme: PropTypes.string
}

const defaultProps = {
  theme: 'default'
}

const childContextTypes = {
  theme: PropTypes.any
}

class ThemeProvider extends Component {
  getChildContext () {
    const {theme} = this.props
    return {
      theme
    }
  }

  render () {
    return this.props.children
  }
}

ThemeProvider.propTypes = propTypes
ThemeProvider.defaultProps = defaultProps
ThemeProvider.childContextTypes = childContextTypes
ThemeProvider.displayName = 'ThemeProvider'

export default ThemeProvider
