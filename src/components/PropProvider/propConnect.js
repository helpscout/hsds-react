// @flow
import type { ConfigGetter } from './types'
import React, { Component } from 'react'
import { getComponentName, hoistNonReactStatics } from '@helpscout/react-utils'
import { channel, contextTypes, getConfigProps, setProps } from './utils'
import { isDefined, isString } from '../../utilities/is'

type Props = Object
type State = {
  providerProps: Object,
}

/**
 * "Connects" a component with the PropProvider (context). Concept is
 * similar to Redux's connect higher-order function.
 *
 * @param   {string} name The component's config namespace.
 * @returns {React.Component} The connected React component.
 */
function propConnect(name?: ConfigGetter) {
  // $FlowFixMe
  let namespace: string = isString(name) ? name : ''

  return function wrapWithComponent(WrappedComponent: any) {
    if (!isDefined(name)) {
      namespace = getComponentName(WrappedComponent)
    }
    const displayName = `connected(${namespace})`

    class Connect extends Component<Props, State> {
      static displayName = displayName
      static contextTypes = contextTypes

      mergedProps: Object
      setWrappedInstance: Function
      unsubscribe: number
      wrappedInstance: any = null

      constructor(props, context) {
        super(props, context)
        this.setWrappedInstance = this.setWrappedInstance.bind(this)
        this.state = {
          providerProps: {},
        }
      }

      componentWillMount() {
        if (this.context[channel] !== undefined) {
          this.unsubscribe = this.context[channel].subscribe(
            setProps.bind(this)
          )
        }
      }

      componentWillUnmount() {
        if (this.unsubscribe !== undefined) {
          this.context[channel].unsubscribe(this.unsubscribe)
        }
      }

      setWrappedInstance(ref) {
        this.wrappedInstance = ref
      }

      render() {
        this.mergedProps = {
          ...getConfigProps(this.state.providerProps, namespace),
          ...this.props,
        }

        return (
          <WrappedComponent
            {...this.mergedProps}
            ref={this.setWrappedInstance}
          />
        )
      }
    }

    return hoistNonReactStatics(Connect, WrappedComponent)
  }
}

export default propConnect
