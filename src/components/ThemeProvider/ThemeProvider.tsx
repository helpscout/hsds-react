import * as React from 'react'

export interface Props {
  children?: any
  theme: string
}

class ThemeProvider extends React.Component<Props> {
  static propTypes: Object
  static displayName: string

  static defaultProps = {
    theme: 'default',
  }
  static childContextTypes = {
    theme: () => null,
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
