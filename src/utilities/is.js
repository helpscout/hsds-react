// @flow

// Tiny primitive functions to check types
export const typeOf = (o: any, type: string): boolean =>
  typeof o === type && o !== null

export const isArray = (o: any): boolean => Array.isArray(o)
export const isBool = (o: any): boolean => typeOf(o, 'boolean')
export const isFunction = (o: any): boolean => typeOf(o, 'function')
export const isString = (o: any): boolean => typeOf(o, 'string')

export const isObject = (o: any): boolean =>
  typeOf(o, 'object') && !isFunction(o) && !isArray(o)
