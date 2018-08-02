// @flow
import React, { Component } from 'react'
import { getComponentName } from '@helpscout/react-utils'
import hoistNonReactStatics from '@helpscout/react-utils/dist/hoistNonReactStatics'
import Consumer from './Consumer'
import { getConfigProps } from './utils'
import { isDefined, isString } from '../../utilities/is'

/**
 * "Connects" a component with the PropProvider (context). Concept is
 * similar to Redux's connect higher-order function.
 *
 * @param   {string} name The component's config namespace.
 * @returns {React.Component} The connected React component.
 */
function propConnect(name?: string) {
  // $FlowFixMe
  let namespace: string = isString(name) ? name : ''

  return function wrapWithComponent(WrappedComponent: any) {
    if (!isDefined(name)) {
      namespace = getComponentName(WrappedComponent)
    }
    const displayName = `connected(${namespace})`

    class Connect extends Component<any> {
      static displayName = displayName
      setWrappedInstance: Function
      wrappedInstance: any = null

      constructor(props, context) {
        super(props, context)
        this.setWrappedInstance = this.setWrappedInstance.bind(this)
      }

      setWrappedInstance(ref) {
        this.wrappedInstance = ref
      }

      render() {
        return (
          <Consumer>
            {(config: Object) => (
              <WrappedComponent
                {...getConfigProps(config, namespace)}
                {...this.props}
                ref={this.setWrappedInstance}
              />
            )}
          </Consumer>
        )
      }
    }

    return hoistNonReactStatics(Connect, WrappedComponent)
  }
}

export default propConnect
