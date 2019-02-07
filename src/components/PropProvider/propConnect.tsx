import * as React from 'react'
import { PropProviderProps, ConfigGetter } from './types'
import getComponentName from '@helpscout/react-utils/dist/getComponentName'
import hoistNonReactStatics from '@helpscout/react-utils/dist/hoistNonReactStatics'
import Context from './Context'
import {
  getConfigProps,
  getGlobalApp,
  propProviderDataAttr,
  isStateless,
} from './utils'
import { classNames } from '../../utilities/classNames'
import {
  namespaceComponent,
  isComponentNamespaced,
} from '../../utilities/component'
import { isDefined, isString } from '../../utilities/is'
import { noop } from '../../utilities/other'

export interface Props {
  className?: string
  wrappedRef: (inst: any) => void
  style: Object
}

const defaultOptions = {
  pure: true,
}

/**
 * "Connects" a component with the PropProvider (context). Concept is
 * similar to Redux's connect higher-order function.
 *
 * @param   {string} name The component's config namespace.
 * @returns {React.Component} The connected React component.
 */
function propConnect(name?: ConfigGetter, options: Object = {}) {
  const { pure } = { ...defaultOptions, ...options }
  // @ts-ignore
  let namespace: string = isString(name) ? name : ''

  return function wrapWithComponent(WrappedComponent: any) {
    if (!isDefined(name)) {
      namespace = getComponentName(WrappedComponent)
    }
    const displayName = `propConnected(${namespace})`
    const OuterBaseComponent = pure ? React.PureComponent : React.Component

    // Register component internally
    if (!isComponentNamespaced(WrappedComponent)) {
      namespaceComponent(namespace)(WrappedComponent)
    }

    class Connect extends OuterBaseComponent<Props> {
      static defaultProps = {
        style: {},
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

      getNamespacedProps = (contextProps: PropProviderProps): Object => {
        return getConfigProps(contextProps, namespace)
      }

      getMergedClassNameProp = (contextProps: PropProviderProps): string => {
        const namespacedProps = this.getNamespacedProps(contextProps)

        // @ts-ignore
        return classNames(namespacedProps.className, this.props.className)
      }

      getMergedStyleProp = (contextProps: PropProviderProps): Object => {
        const namespacedProps = this.getNamespacedProps(contextProps)
        let style = this.props.style
        // @ts-ignore
        if (namespacedProps.style) {
          style = {
            // @ts-ignore
            ...namespacedProps.style,
            ...style,
          }
        }

        return style
      }

      getMergedProps = (contextProps: PropProviderProps): Object => {
        const { wrappedRef, ...rest } = this.props
        const namespacedProps = this.getNamespacedProps(contextProps)
        const className = this.getMergedClassNameProp(contextProps)
        const style = this.getMergedStyleProp(contextProps)

        return {
          'data-cy': namespace,
          ...namespacedProps,
          ...rest,
          className,
          style,
          [propProviderDataAttr]: getGlobalApp(contextProps),
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

export default propConnect
