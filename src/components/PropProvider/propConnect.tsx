import { PropProviderProps, ConfigGetter } from './types'
import * as React from 'react'
import getComponentName from '@helpscout/react-utils/dist/getComponentName'
import hoistNonReactStatics from '@helpscout/react-utils/dist/hoistNonReactStatics'
import Context from './Context'
import { getConfigProps, getGlobalApp, propProviderDataAttr } from './utils'
import { classNames } from '../../utilities/classNames'
import { isDefined } from '../../utilities/is'

export interface Props {
  className?: string
  style: Object
}

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
