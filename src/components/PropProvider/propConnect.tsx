import { PropProviderProps, ConfigGetter } from './types'
import * as React from 'react'
import getComponentName from '@helpscout/react-utils/dist/getComponentName'
import hoistNonReactStatics from '@helpscout/react-utils/dist/hoistNonReactStatics'
import Context from './Context'
import { getConfigProps, getGlobalApp, propProviderDataAttr } from './utils'
import { isDefined } from '../../utilities/is'

type Props = Object

/**
 * "Connects" a component with the PropProvider (context). Concept is
 * similar to Redux's connect higher-order function.
 *
 * @param   {string} name The component's config namespace.
 * @returns {React.Component} The connected React component.
 */
function propConnect(name?: ConfigGetter) {
  let namespace: string = typeof name === 'string' ? name : ''

  return function wrapWithComponent(WrappedComponent: any) {
    if (!isDefined(name)) {
      namespace = getComponentName(WrappedComponent)
    }
    const displayName = `connected(${namespace})`

    class Connect extends React.Component<Props> {
      static displayName = displayName

      wrappedInstance: any = null

      constructor(props, context) {
        super(props, context)
        this.setWrappedInstance = this.setWrappedInstance.bind(this)
      }

      setWrappedInstance(ref) {
        this.wrappedInstance = ref
      }

      getMergedProps = (contextProps: PropProviderProps): Object => {
        const namespacedProps = getConfigProps(contextProps, namespace)

        return {
          ...namespacedProps,
          ...this.props,
          [propProviderDataAttr]: getGlobalApp(contextProps),
        }
      }

      render() {
        return (
          <Context.Consumer>
            {contextProps => (
              <WrappedComponent
                {...this.getMergedProps(contextProps)}
                ref={this.setWrappedInstance}
              />
            )}
          </Context.Consumer>
        )
      }
    }

    return hoistNonReactStatics(Connect, WrappedComponent)
  }
}

export default propConnect
