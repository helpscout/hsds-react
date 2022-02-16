import React from 'react'
import lodashIsArray from 'lodash.isarray'

export function isDefined(value) {
  return value !== undefined && value !== null
}

export const anyDefined = (...args) => args.filter(isDefined).length > 0

export const allDefined = (...args) => {
  const result = args.filter(isDefined)
  return !!(args.length && result.length === args.length)
}

export const allPropsDefined = (props = {}) => {
  return allDefined(...Object.values(props))
}

export function typeOf(value, type) {
  return isDefined(value) && typeof value === type
}

export function isArray(value) {
  return lodashIsArray(value)
}

export function isBool(value) {
  return typeOf(value, 'boolean')
}

export function isBoolean(value) {
  return isBool(value)
}

export function isFunction(value) {
  return typeOf(value, 'function')
}

export function isNumber(value) {
  return typeOf(value, 'number')
}

export function isString(value) {
  return typeOf(value, 'string')
}

export function isObject(value) {
  return typeOf(value, 'object') && !isFunction(value) && !isArray(value)
}

export function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isElement(element) {
  return React.isValidElement(element)
}

export function isDOMTypeElement(element) {
  return isElement(element) && typeof element.type === 'string'
}
