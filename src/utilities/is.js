// @flow

// Tiny primitive functions to check types
export const typeOf = (o: any, type: string): boolean =>
  typeof o === type && o !== null

export const isArray = (o: any): boolean => Array.isArray(o)

export const isBool = (o: any): boolean => typeOf(o, 'boolean')

export const isFunction = (o: any): boolean => typeOf(o, 'function')

export const isNumber = (o: any): boolean => typeOf(o, 'number')

export const isString = (o: any): boolean => typeOf(o, 'string')

export const isObject = (o: any): boolean =>
  typeOf(o, 'object') && !isFunction(o) && !isArray(o)

export const isDefined = (o: any): boolean => o !== undefined

export const anyDefined = (...args: any): boolean =>
  args.filter(isDefined).length > 0

export const allDefined = (...args: any): boolean => {
  const result = args.filter(isDefined)
  return !!(args.length && result.length === args.length)
}

export const allPropsDefined = (props: Object = {}): boolean => {
  return allDefined(...Object.values(props))
}
