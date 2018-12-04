import { PropProviderProps, ConfigGetter } from './types'
import * as React from 'react'
import getComponentName from '@helpscout/react-utils/dist/getComponentName'
import hoistNonReactStatics from '@helpscout/react-utils/dist/hoistNonReactStatics'
import Context from './Context'
import { getConfigProps, getGlobalApp, propProviderDataAttr } from './utils'
import { classNames } from '../../utilities/classNames'
import {
  namespaceComponent,
  isComponentNamespaced,
} from '../../utilities/component'
import { isDefined, isString } from '../../utilities/is'

export interface Props {
  className?: string
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
    const displayName = `connected(${namespace})`
    const OuterBaseComponent = pure ? React.PureComponent : React.Component

    // Register component internally
    if (!isComponentNamespaced(WrappedComponent)) {
      namespaceComponent(namespace)(WrappedComponent)
    }

    class Connect extends OuterBaseComponent<Props> {
      static defaultProps = {
        style: {},
      }
      static displayName = displayName

      wrappedInstance: any = null

      constructor(props, context) {
        super(props, context)
        this.setWrappedInstance = this.setWrappedInstance.bind(this)
      }

      setWrappedInstance(ref) {
        this.wrappedInstance = ref
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
        const namespacedProps = this.getNamespacedProps(contextProps)
        const className = this.getMergedClassNameProp(contextProps)
        const style = this.getMergedStyleProp(contextProps)

        return {
          ...namespacedProps,
          ...this.props,
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

function isStateless(Component: any): boolean {
  return typeof Component !== 'string' && !Component.prototype.render
}

export default propConnect
