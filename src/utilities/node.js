/* istanbul ignore file */
import closest from './closest'

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

export const getClosestDocument = node => {
  return node && isNodeElement(node) ? node.ownerDocument : document
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

export function nodesHaveSameParent(parentSelector, node1, node2) {
  if (!parentSelector || !node1 || !node2) return false

  //for testing
  if (!node1.closest) {
    return false
  }

  const parent1 = node1.closest(parentSelector)
  const parent2 = node2.closest(parentSelector)

  if (!parent1 || !parent2) return false

  return parent1.isEqualNode(parent2)
}
