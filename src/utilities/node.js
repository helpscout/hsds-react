import { isNodeEnv } from './other'

export const Element = window.Element

export const isNodeElement = (node) => {
  return node && (node instanceof Element || node === document)
}

export const getNodeScope = (nodeScope) => {
  return nodeScope && isNodeElement(nodeScope) ? nodeScope : document
}

export const applyStylesToNode = (node, styles = {}) => {
  if (!node) return false
  if (!isNodeElement(node)) return node
  if (typeof styles !== 'object') return node

  Object.keys(styles).forEach(prop => {
    const value = styles[prop]
    node.style[prop] = typeof value === 'number' && prop !== 'zIndex' ? `${value}px` : value
  })

  return node
}

export const getComputedHeightProps = (node) => {
  if (!isNodeElement(node)) return
  const el = node !== document ? node : document.body
  const height = el.offsetHeight

  const {
    marginTop,
    marginBottom,
    paddingTop,
    paddingBottom
  } = window.getComputedStyle(el)

  // Adjust for node environments (for testing purposes)
  let offset = parseFloat(marginTop) + parseFloat(marginBottom)
  /* istanbul ignore next */
  if (!isNodeEnv()) {
    offset = offset + parseFloat(paddingTop) + parseFloat(paddingBottom)
  }

  return {
    height,
    offset
  }
}

export const getComputedWidthProps = (node) => {
  if (!isNodeElement(node)) return
  const el = node !== document ? node : document.body
  const width = el.offsetWidth

  const {
    marginLeft,
    marginRight,
    paddingLeft,
    paddingRight
  } = window.getComputedStyle(el)

  // Adjust for node environments (for testing purposes)
  let offset = parseFloat(marginLeft) + parseFloat(marginRight)
  /* istanbul ignore next */
  if (!isNodeEnv()) {
    offset = offset + parseFloat(paddingLeft) + parseFloat(paddingRight)
  }

  return {
    width,
    offset
  }
}

export const getComputedOffsetTop = (node) => {
  if (!isNodeElement(node)) return
  const offset = getComputedHeightProps(document).offset
  return node.getBoundingClientRect().top + (offset / 2)
}

export const getComputedOffsetLeft = (node) => {
  if (!isNodeElement(node)) return
  const offset = getComputedWidthProps(document).offset
  return node.getBoundingClientRect().left + (offset / 2)
}

export const getViewportHeight = (scope) => {
  const node = getNodeScope(scope)
  const { height, offset } = getComputedHeightProps(node)

  /* istanbul ignore next */
  // Tested one case, but cannot test the other in JSDOM
  return height > window.innerHeight ? height : window.innerHeight - offset
}

export const getViewportWidth = (scope) => {
  const node = getNodeScope(scope)
  const { width, offset } = getComputedWidthProps(node)

  /* istanbul ignore next */
  // Tested one case, but cannot test the other in JSDOM
  return width > window.innerWidth ? width : window.innerWidth - offset
}
