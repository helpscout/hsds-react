import * as React from 'react'
import { ConfigGetter, PropProviderProps } from './PropProvider.types'
import getComponentName from '@helpscout/react-utils/dist/getComponentName'
import hoistNonReactStatics from '@helpscout/react-utils/dist/hoistNonReactStatics'
import Context from './PropProvider.Context'
import { getGlobalApp, isStateless } from './PropProvider.utils'
import { isDefined, isString } from '../../utilities/is'
import { noop } from '../../utilities/other'

export interface Props {
  wrappedRef: (inst: any) => void
}

const defaultOptions = {
  pure: true,
}

/**
 * "Connects" a component with the PropProvider (context) values. Concept is
 * similar to Redux's connect higher-order function.
 *
 * @param   {string} name The component's config namespace.
 * @returns {React.Component} The connected React component.
 */
function contextConnect(name?: ConfigGetter, options: Object = {}) {
  const { pure } = { ...defaultOptions, ...options }
  // @ts-ignore
  let namespace: string = isString(name) ? name : ''

  return function wrapWithComponent(WrappedComponent: any) {
    if (!isDefined(name)) {
      namespace = getComponentName(WrappedComponent)
    }
    const displayName = `contextConnected(${namespace})`
    const OuterBaseComponent = pure ? React.PureComponent : React.Component

    class Connect extends OuterBaseComponent<Props> {
      static defaultProps = {
        wrappedRef: noop,
      }
      static displayName = displayName

      wrappedInstance: any = null

      constructor(props, context) {
        super(props, context)
        this.setWrappedInstance = this.setWrappedInstance.bind(this)
      }

      setWrappedInstance(ref) {
        this.wrappedInstance = ref
        this.props.wrappedRef(ref)
      }

      getMergedProps = (contextProps: PropProviderProps): Object => {
        const { wrappedRef, ...rest } = this.props

        return {
          ...rest,
          propProviderContextApp: getGlobalApp(contextProps),
          propProviderContextValue: contextProps,
          ref: !isStateless(WrappedComponent)
            ? this.setWrappedInstance
            : undefined,
        }
      }

      render() {
        return (
          <Context.Consumer>
            {contextProps => (
              <WrappedComponent {...this.getMergedProps(contextProps)} />
            )}
          </Context.Consumer>
        )
      }
    }

    return hoistNonReactStatics(Connect, WrappedComponent)
  }
}

export default contextConnect
