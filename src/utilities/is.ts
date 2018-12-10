export function isDefined<T>(value: T | undefined | null): value is T {
  return <T>value !== undefined && <T>value !== null
}

export const anyDefined = (...args): boolean =>
  args.filter(isDefined).length > 0

export const allDefined = (...args): boolean => {
  const result = args.filter(isDefined)
  return !!(args.length && result.length === args.length)
}

export const allPropsDefined = (props: Object = {}): boolean => {
  return allDefined(...Object.values(props))
}

export function typeOf<T>(value: unknown, type: string): value is T {
  return isDefined(value) && typeof value === type
}

export function isArray<T>(value: unknown): value is Array<T> {
  return Array.isArray(value)
}

export function isBool<T>(value: unknown): value is Boolean {
  return typeOf(value, 'boolean')
}

export function isBoolean<T>(value: unknown): value is Boolean {
  return isBool(value)
}

export function isFunction<T>(value: unknown): value is Function {
  return typeOf(value, 'function')
}

export function isNumber<T>(value: unknown): value is Number {
  return typeOf(value, 'number')
}

export function isString<T>(value: unknown): value is String {
  return typeOf(value, 'string')
}

export function isObject<T>(value: unknown): value is any {
  return typeOf(value, 'object') && !isFunction(value) && !isArray(value)
}

export function isPlainObject<T>(value: unknown): value is any {
  return Object.prototype.toString.call(value) === '[object Object]'
}
