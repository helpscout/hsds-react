import * as React from 'react'
import { noop } from '../../utilities/other'

export interface Props {
  children?: any
  theme: string
}

export interface State {
  theme: string
}

class ThemeProvider extends React.PureComponent<Props, State> {
  static propTypes: Object
  static displayName: string

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

export default ThemeProvider
