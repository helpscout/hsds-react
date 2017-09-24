const Element = window.Element

export const applyStylesToNode = (node, styles = {}) => {
  if (!node || node instanceof Element !== true) return
  if (typeof styles !== 'object') return

  Object.keys(styles).forEach(prop => {
    const value = styles[prop]
    node.style[prop] = typeof value === 'number' ? `${value}px` : value
  })

  return node
}
