import * as React from 'react'
import { PropProviderProps } from './types'
import Context from './Context'
import { ThemeProvider } from '../styled'
import { renderAsSingleChild } from '../../utilities/component'
import { setGlobalApp, shallowMergeProps, propProviderDataAttr } from './utils'

export interface Props {
  app: string
  children: any
  value: PropProviderProps
}

class PropProvider extends React.Component<Props> {
  static defaultProps = {
    app: 'blue',
    value: {},
  }

  renderChildren = () => {
    const { children } = this.props

    return renderAsSingleChild(children, 'div', { className: 'c-PropProvider' })
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
              {this.renderChildren()}
            </ThemeProvider>
          </Context.Provider>
        )}
      </Context.Consumer>
    )
  }
}

export default PropProvider
