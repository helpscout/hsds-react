import React from 'react'

export const isComponentOneOfType = (component, types) => {
  if (!component || (!Array.isArray(types) && typeof types !== 'string')) return false
  const isArray = Array.isArray(types)

  return (
    React.isValidElement(component) &&
    Array.isArray(types) &&
    component.type &&
    isArray ? types.some(o => o === component.type) : component.type === types
  )
}

export const isNativeSpanType = (component) => {
  const types = [
    'a',
    'b',
    'bold',
    'em',
    'i',
    'span',
    'strong',
    'u'
  ]

  return isComponentOneOfType(component, types)
}

export const isNativeBlockType = (component) => {
  const types = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'blockquote',
    'header', 'main', 'section', 'aside',
    'figure',
    'div'
  ]

  return isComponentOneOfType(component, types)
}
