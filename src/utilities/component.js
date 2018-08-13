// @flow
import { includes } from './arrays'
import { isObject } from './is'

export const COMPONENT_KEY = '__BlueComponent__'
export const CONTROL_TYPE = ['Button', 'Input', 'Input.AddOn', 'Select']

/**
 * Retrieves the internal Blue component namespace/key.
 *
 * @param   {React.Component} Component The component.
 * @returns {string} The namespace value.
 */
export const getComponentKey = (Component: any): string => {
  if (isObject(Component) && Component.hasOwnProperty('type')) {
    return Component.type[COMPONENT_KEY]
  }

  return Component && Component[COMPONENT_KEY]
}

/**
 * Sets the internal Blue component namespace/key.
 *
 * @param  {React.Component} Component The component.
 * @param  {string} The namespace value.
 * @return {React.Component} The updated component.
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
 * @param  {React.Component} Component The component.
 * @param  {string} The namespace value.
 * @return {boolean} The match result.
 */
export const isComponentKey = (Component: any, key: string): boolean => {
  return getComponentKey(Component) === key
}

/**
 * Determines if the provided Component is a control type.
 *
 * @param  {React.Component} Component The component.
 * @return {boolean} The result.
 */
export const isComponentTypeControl = (Component: any): boolean => {
  const key = getComponentKey(Component)
  console.log(key)

  return includes(CONTROL_TYPE, key)
}
