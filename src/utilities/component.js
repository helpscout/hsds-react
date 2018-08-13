// @flow
import { includes } from './arrays'
import { isObject } from './is'

export const COMPONENT_KEY = '__BlueComponent__'
export const CONTROL_TYPE = ['Button', 'Input', 'Input.AddOn', 'Select']

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
export const getComponentKey = (Component: any): string => {
  if (isReactComponent(Component)) {
    return Component.type[COMPONENT_KEY]
  }

  return Component && Component[COMPONENT_KEY]
}

/**
 * Sets the internal Blue component namespace/key.
 *
 * @param   {React.Component} Component The component.
 * @param   {string} The namespace value.
 * @returns {React.Component} The updated component.
 */
export const setComponentKey = (Component: any, key: string): any => {
  if (Component) {
    Component[COMPONENT_KEY] = key
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
export const isComponentKey = (Component: any, key: string): boolean => {
  return getComponentKey(Component) === key
}

/**
 * Determines if the provided Component is a control type.
 *
 * @param   {React.Component} Component The component.
 * @returns {boolean} The result.
 */
export const isComponentTypeControl = (Component: any): boolean => {
  const key = getComponentKey(Component)

  return includes(CONTROL_TYPE, key)
}
