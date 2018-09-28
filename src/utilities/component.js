// @flow
import { includes } from './arrays'
import { isObject } from './is'

let REGISTERED_COMPONENTS = {}
export const COMPONENT_NAMESPACE_KEY = '__BlueComponent__'

export const CONTROL_TYPE = [
  'Button',
  'CopyButton',
  'Input',
  'Input.AddOn',
  'Select',
]

export const CHAT_TYPE = [
  'Message.Action',
  'Message.Attachment',
  'Message.Chat',
  'Message.Content',
  'Message.Embed',
  'Message.Media',
  'Message.Question',
]

/**
 * Determines if a Component is a React component.
 *
 * @param   {React.Component} Component The component.
 * @returns {boolean} The result.
 */
export const isReactComponent = (Component: any) => {
  return (
    isObject(Component) &&
    Component.hasOwnProperty('$$typeof') &&
    Component.hasOwnProperty('type')
  )
}

/**
 * Retrieves the internal Blue component namespace/key.
 *
 * @param   {React.Component} Component The component.
 * @returns {string} The namespace value.
 */
export const getComponentName = (Component: any): string => {
  if (isReactComponent(Component)) {
    return Component.type[COMPONENT_NAMESPACE_KEY]
  }

  return Component && Component[COMPONENT_NAMESPACE_KEY]
}

/**
 * Retrieves a list of namespace registered Blue components.
 *
 * @returns {Array<string>} The registered namespaces.
 */
export const getRegisteredComponents = (): Array<string> =>
  Object.keys(REGISTERED_COMPONENTS).filter(key => key)

/**
 * Secretly reset internal namespace registry.
 */
export const __clearRegisteredComponents = () => {
  REGISTERED_COMPONENTS = {}
}

/**
 * Decorator (HOC) that sets the internal Blue component namespace/key.
 *
 * @param   {string} The namespace value.
 * @param   {React.Component} Component The component.
 * @returns {React.Component} The updated component.
 */
export const namespaceComponent = (key: string) => (Component: any): any => {
  /* istanbul ignore else */
  if (Component) {
    // Set the namespace.
    Component[COMPONENT_NAMESPACE_KEY] = key
    // Add to internal registry.
    REGISTERED_COMPONENTS[key] = true
    // Conveniently set the displayName too.
    Component.displayName = key
  }

  return Component
}

/**
 * Determines if the internal Blue namespace matches a key.
 *
 * @param   {React.Component} Component The component.
 * @param   {string} The namespace value.
 * @returns {boolean} The match result.
 */
export const isComponentNamed = (Component: any, key: string): boolean => {
  return getComponentName(Component) === key
}

/**
 * Determines if the provided Component is a control type.
 *
 * @param   {React.Component} Component The component.
 * @returns {boolean} The result.
 */
export const isComponentTypeControl = (Component: any): boolean => {
  const key = getComponentName(Component)

  return includes(CONTROL_TYPE, key)
}

/**
 * Determines if the provided Component is a Chat type.
 *
 * @param   {React.Component} Component The component.
 * @returns {boolean} The result.
 */
export const isComponentTypeChat = (Component: any): boolean => {
  const key = getComponentName(Component)

  return includes(CHAT_TYPE, key)
}
