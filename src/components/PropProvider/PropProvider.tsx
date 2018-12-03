import { PropProviderProps } from './types'
import * as React from 'react'
import Context from './Context'
import { ThemeProvider } from '../styled'
import { setGlobalApp, shallowMergeProps, propProviderDataAttr } from './utils'

export interface Props {
  app: string
  children: any
  value: PropProviderProps
}

class PropProvider extends React.PureComponent<Props> {
  static defaultProps = {
    app: 'blue',
    value: {},
  }

  getChildren = () => {
    const { children } = this.props

    if (!children) return null

    if (React.Children.count(children) > 1) {
      return <div className="c-PropProvider">{children}</div>
    }

    return React.Children.only(children)
  }

  enhanceContextProps = (contextProps: PropProviderProps) => {
    return setGlobalApp(contextProps, this.props.app)
  }

  getThemeProviderProps = (contextProps: PropProviderProps) => ({
    // @ts-ignore
    [propProviderDataAttr]: this.props.app,
  })

  render() {
    return (
      <Context.Consumer>
        {contextProps => (
          <Context.Provider
            value={shallowMergeProps(
              this.enhanceContextProps(contextProps),
              this.props.value
            )}
          >
            <ThemeProvider theme={this.getThemeProviderProps(contextProps)}>
              {this.getChildren()}
            </ThemeProvider>
          </Context.Provider>
        )}
      </Context.Consumer>
    )
  }
}

export default PropProvider
