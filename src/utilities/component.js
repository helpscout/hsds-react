/* istanbul ignore file */
import React from 'react'
import getComponentNameUtil from '@helpscout/react-utils/dist/getComponentName'
import isNil from 'lodash.isnil'
import isPlainObject from 'lodash.isplainobject'

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
 * Retrieves the internal Blue component namespace/key.
 *
 * @param   {React.Component} Component The component.
 * @returns {string} The namespace value.
 */
export const getComponentName = Component => {
  return getComponentNameUtil(Component)
}

/**
 * Attempts to retrieve a React key from a child when iterating.
 * @param   {React.Component} Component The component.
 * @param   {number | string} index The iterating index value.
 * @param   {string} fallback A fallback value.
 * @returns {string} The React cnild key.
 */
export const getComponentKey = (Component, index, fallback) => {
  if (!React.isValidElement(Component) && !isPlainObject(Component)) {
    return undefined
  }

  let key

  if (Component.props && Component.props.id) {
    key = Component.props.id
  } else if (!isNil(Component.key)) {
    key = Component.key
  } else if (!isNil(fallback)) {
    key = fallback
  } else if (!isNil(index)) {
    key = `unsafeComponentKey-${index}`
  } else {
    key = Component.key || undefined
  }

  return key
}
