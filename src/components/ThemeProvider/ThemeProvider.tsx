import * as React from 'react'
import { noop } from '../../utilities/other'

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
    theme: noop,
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
