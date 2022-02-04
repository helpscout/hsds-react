/* istanbul ignore file */
import closest from './closest'
import get from './get'
import { isNodeEnv } from './other'

const Element = window['Element']

/**
 * Note: A lot of stuff here cannot be tested in JSDOM (missing measurements for props)
 * Tests exist for some cases but file is not included in coverage
 */

export const isNodeElement = node => {
  return (
    node &&
    (node instanceof Element ||
    node.nodeType === 1 || // Thanks Brett! <3
      node === document)
  )
}

export const getNodeScope = nodeScope => {
  return nodeScope && isNodeElement(nodeScope)
    ? nodeScope
    : nodeScope === window
    ? window
    : document
}

export const applyStylesToNode = (node, styles = {}) => {
  if (!node) return false
  if (!isNodeElement(node)) return node
  if (typeof styles !== 'object') return node

  Object.keys(styles).forEach(prop => {
    const value = styles[prop]
    node.style[prop] =
      typeof value === 'number' && prop !== 'zIndex' ? `${value}px` : value
  })

  return node
}

export const parseFloatValue = value => parseFloat(value || '0')

export const getComputedHeightProps = node => {
  if (!isNodeElement(node))
    return {
      height: 0,
      offset: 0,
    }

  const el = node !== document ? node : document.body
  const height = el.offsetHeight

  const {
    marginTop,
    marginBottom,
    paddingTop,
    paddingBottom,
  } = window.getComputedStyle(el)

  let offset = parseFloatValue(marginTop) + parseFloatValue(marginBottom)
  if (!isNodeEnv()) {
    offset =
      offset + parseFloatValue(paddingTop) + parseFloatValue(paddingBottom)
  }

  return {
    height,
    offset,
  }
}

export const getComputedWidthProps = node => {
  if (!isNodeElement(node))
    return {
      width: 0,
      offset: 0,
    }

  const el = node !== document ? node : document.body
  const width = el.offsetWidth

  const {
    marginLeft,
    marginRight,
    paddingLeft,
    paddingRight,
  } = window.getComputedStyle(el)

  let offset = parseFloatValue(marginLeft) + parseFloatValue(marginRight)
  if (!isNodeEnv()) {
    offset =
      offset + parseFloatValue(paddingLeft) + parseFloatValue(paddingRight)
  }

  return {
    width,
    offset,
  }
}

export const getComputedOffsetTop = node => {
  if (!isNodeElement(node)) return 0
  const offset = getComputedHeightProps(document).offset
  return node.getBoundingClientRect().top + offset / 2
}

export const getComputedOffsetLeft = node => {
  if (!isNodeElement(node)) return 0
  const offset = getComputedWidthProps(document).offset
  return node.getBoundingClientRect().left + offset / 2
}

export const getViewportHeight = scope => {
  const node = getNodeScope(scope)
  const { height, offset } = getComputedHeightProps(node)

  return height > window.innerHeight ? height : window.innerHeight - offset
}

export const getViewportWidth = scope => {
  const node = getNodeScope(scope)
  const { width, offset } = getComputedWidthProps(node)

  return width > window.innerWidth ? width : window.innerWidth - offset
}

/**
 * Checks if node is visible with the view (a node Element or window). This is typically used for scroll interactions.
 * Note: This function currently only measures vertical scroll-based
 * calculations.
 *
 * @param     options   object    Config object
 * @option    node      Element   DOM node to check visibility for
 * @option    scope     Element   DOM node to check visibility within
 * @option    offset    number    Top buffer amount for visiblity check
 * @option    complete  bool      node must be in complete view, if true
 * @return    bool                True/False if node is in view
 */
export const isNodeVisible = options => {
  if (!options || typeof options !== 'object') return false
  const { node, scope, offset, complete } = options

  if (!isNodeElement(node)) return false

  let nodeOffset = offset !== undefined ? offset : 0
  nodeOffset =
    typeof nodeOffset !== 'number' ? 0 : nodeOffset < 0 ? 0 : nodeOffset

  const nodeScope = getNodeScope(scope || window)
  const isWindow = nodeScope === window
  const bufferOffset = 4 // To account for potential borders on the nodeScope

  const rect = node.getBoundingClientRect()
  const offsetTop = isNodeEnv() ? rect.top : node.offsetTop

  const viewportHeight = isWindow
    ? window.innerHeight
    : nodeScope.getBoundingClientRect().height
  const viewportTop = isWindow ? window.scrollY : nodeScope.scrollTop
  const viewportBottom = isWindow
    ? window.innerHeight
    : viewportTop + viewportHeight + bufferOffset

  const bottom = offsetTop + rect.height
  const top = complete && nodeOffset === 0 ? bottom : bottom - nodeOffset

  return (
    parseInt(top, 10) <= parseInt(viewportBottom, 10) &&
    parseInt(bottom, 10) >= parseInt(viewportTop, 10)
  )
}

export const getScrollParent = node => {
  if (!isNodeElement(node)) {
    return null
  }
  if (node.scrollHeight > node.clientHeight) {
    return node
  } else {
    return getScrollParent(node.parentNode)
  }
}

export const isNodeScrollable = node => {
  return node && isNodeElement(node)
    ? node.scrollHeight > node.clientHeight
    : false
}

export const getClosestDocument = node => {
  return node && isNodeElement(node) ? node.ownerDocument : document
}

export const hasContentOverflowX = node => {
  if (!isNodeElement(node)) return false
  return node.clientWidth < node.scrollWidth
}

export const hasContentOverflowY = node => {
  if (!isNodeElement(node)) return false
  return node.clientHeight < node.scrollHeight
}

export const getClosestNode = (node, selector) => {
  if (!isNodeElement(node)) return null
  if (typeof selector !== 'string') return null
  return closest(node, selector)
}

/**
 * Enhanced wrapper for Node.scrollIntoViewIfNeeded()
 *
 * @param   {Node} node
 * @returns {Node}
 */
export const scrollIntoView = node => {
  if (!isNodeElement(node)) return
  if (node['scrollIntoViewIfNeeded']) return node.scrollIntoViewIfNeeded()
  if (node['scrollIntoView']) return node.scrollIntoView()
}

export const getWindowFromNode = node => {
  if (!isNodeElement(node)) return window
  return get(node, 'ownerDocument.defaultView', window)
}

export const isNodeWithinViewport = options => {
  const defaultOptions = {
    offset: 0,
  }

  const mergedOptions = { ...defaultOptions, ...options }
  const { node, offset } = mergedOptions

  if (!isNodeElement(node)) return false

  const { y } = node.getBoundingClientRect()

  const position = y + offset + window.scrollY
  const viewportPosition = window.scrollY + window.innerHeight

  return position < viewportPosition
}

export function nodesHaveSameParent(parentSelector, node1, node2) {
  if (!parentSelector || !node1 || !node2) return false

  const parent1 = node1.closest(parentSelector)
  const parent2 = node2.closest(parentSelector)

  if (!parent1 || !parent2) return false

  return parent1.isEqualNode(parent2)
}
