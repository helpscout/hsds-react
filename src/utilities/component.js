/* istanbul ignore file */
import React from 'react'
import getComponentNameUtil from '@helpscout/react-utils/dist/getComponentName'
import isFunction from 'lodash.isfunction'
import isPlainObject from 'lodash.isplainobject'
import isString from 'lodash.isstring'
import { includes } from './arrays'
import { isArray, isDefined } from './is'

export const CARD_TYPE = ['ArticleCard', 'Card']

export const CONTROL_TYPE = [
  'Button',
  'CopyButton',
  'Input',
  'Input.AddOn',
  'Select',
]

export const CHAT_TYPE = [
  'MessageAction',
  'MessageAttachment',
  'MessageChat',
  'MessageContent',
  'MessageEmbed',
  'MessageMedia',
  'MessageQuestion',
]

/**
 * Determines if a Component is a React component.
 *
 * @param   {React.Component} Component The component.
 * @returns {boolean} The result.
 */
export const isReactComponent = Component => {
  return (
    isPlainObject(Component) &&
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
export const getComponentName = Component => {
  return getComponentNameUtil(Component)
}

/**
 * Determines if the internal Blue namespace matches a key.
 *
 * @param   {React.Component} Component The component.
 * @param   {string} The namespace value.
 * @returns {boolean} The match result.
 */
export const isComponentNamed = (Component, key) => {
  return getComponentName(Component) === key
}

/**
 * Determines if the provided Component is a control type.
 *
 * @param   {React.Component} Component The component.
 * @returns {boolean} The result.
 */
export const isComponentTypeControl = Component => {
  const key = getComponentName(Component)
  return includes(CONTROL_TYPE, key)
}

/**
 * Determines if the provided Component is a Chat type.
 *
 * @param   {React.Component} Component The component.
 * @returns {boolean} The result.
 */
export const isComponentTypeChat = Component => {
  const key = getComponentName(Component)
  return includes(CHAT_TYPE, key)
}

/**
 * Attempts to retrieve a React key from a child when iterating.
 * @param   {React.Component} Component The component.
 * @param   {number | string} index The iterating index value.
 * @param   {string} fallback A fallback value.
 * @returns {string} The React cnild key.
 */
export const getComponentKey = (Component, index, fallback) => {
  if (!isReactComponent(Component) && !isPlainObject(Component)) {
    return undefined
  }

  let key

  if (Component.props && Component.props.id) {
    key = Component.props.id
  } else if (isDefined(Component.key)) {
    key = Component.key
  } else if (isDefined(fallback)) {
    key = fallback
  } else if (isDefined(index)) {
    key = `unsafeComponentKey-${index}`
  } else {
    key = Component.key || undefined
  }

  return key
}

export const renderRenderPropComponent = (renderProp, props = {}) => {
  if (React.isValidElement(renderProp)) {
    return React.cloneElement(renderProp, props)
  }
  if (isFunction(renderProp)) {
    return renderProp(props)
  }
  return null
}

export const renderChildrenSafely = (
  children,
  baseTag = 'span',
  props = {}
) => {
  const { children: childrenProp, ...rest } = props

  if (isString(children)) {
    return React.createElement(baseTag, {
      ...rest,
      dangerouslySetInnerHTML: { __html: children },
    })
  } else {
    return React.createElement(baseTag, rest, children)
  }
}

export const renderAsSingleChild = (children, baseTag, props = {}) => {
  const _isArray = isArray(children)
  if (!React.isValidElement(children) && !_isArray) return null

  const count = React.Children.count(children)
  if (!count) return null

  const tag = baseTag || 'div'

  // Render multiple children, or an array
  if (count > 1 || _isArray) {
    return React.createElement(tag, props, children)
  }

  // Render single child
  return React.Children.only(children)
}
