import React from 'react'
import isString from 'lodash.isstring'

export const stringifyArray = arr => arr.sort().toString()

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
