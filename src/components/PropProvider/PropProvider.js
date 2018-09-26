// @flow
import type { PropProviderProps } from './types'
import React, { Component } from 'react'
import Context from './Context'
import { shallowMergeProps } from './utils'

type Props = {
  children: any,
  value: PropProviderProps,
}

class PropProvider extends Component<Props> {
  static defaultProps = {
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

  render() {
    return (
      <Context.Consumer>
        {contextProps => (
          <Context.Provider
            value={shallowMergeProps(contextProps, this.props.value)}
          >
            {this.getChildren()}
          </Context.Provider>
        )}
      </Context.Consumer>
    )
  }
}

export default PropProvider
