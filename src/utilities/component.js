export const getComponentDefaultProp = (
  component,
  prop,
  fallback = undefined
) => {
  if (typeof component !== 'object' && typeof component !== 'function')
    return fallback
  if (typeof prop !== 'string') return fallback

  return component.defaultProps && component.defaultProps[prop] !== undefined
    ? component.defaultProps[prop]
    : fallback
}

/**
 * Naive way of determining if a child is a React component
 */
export const isComponent = (child: any) => {
  return (child && typeof child === 'object') || typeof child === 'function'
}
