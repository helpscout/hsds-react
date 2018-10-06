import { PropProviderProps } from './types'
import * as React from 'react'
import Context from './Context'
import { setGlobalApp, shallowMergeProps } from './utils'

type Props = {
  app: string
  children: any
  value: PropProviderProps
}

class PropProvider extends React.Component<Props> {
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
            {this.getChildren()}
          </Context.Provider>
        )}
      </Context.Consumer>
    )
  }
}

export default PropProvider
