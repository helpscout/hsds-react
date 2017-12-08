export const getComponentDefaultProp = (component, prop, fallback = undefined) => {
  if (
    typeof component !== 'object' &&
    typeof component !== 'function'
  ) return fallback
  if (typeof prop !== 'string') return fallback

  return component.defaultProps && component.defaultProps[prop] !== undefined
    ? component.defaultProps[prop]
    : fallback
}
