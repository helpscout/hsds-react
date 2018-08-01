// @flow
import React from 'react'
import { getComponentName } from '@helpscout/react-utils'
import Consumer from './Consumer'
import { NOOP } from './utils'
import { isDefined, isString } from '../../utilities/is'

/**
 * "Connects" a component with the ConfigProvider (context). Concept is
 * similar to Redux's connect higher-order function.
 *
 * @param   {string} name The component's config namespace.
 * @returns {React.Component} The connected React component.
 */
function configConnect(name?: string) {
  let configName = isString(name) ? name : NOOP

  return (ComposedComponent: any) => {
    if (!isDefined(name)) {
      configName = getComponentName(ComposedComponent)
    }

    return (props: Object) => (
      <Consumer>
        {(configs: Object) => (
          <ComposedComponent {...configs[configName]} {...props} />
        )}
      </Consumer>
    )
  }
}

export default configConnect
