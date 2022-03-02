import isNil from 'lodash.isnil'
import { getNodeScope, isNodeElement } from './node'

export const FOCUSABLE_SELECTOR =
  'a[href],frame,iframe,input:not([type=hidden]):not([disabled]),select,textarea,button:not([disabled]):not([tabindex="-1"]),*[tabindex]:not([tabindex="-1"])'

export const findFocusableNodes = nodeScope => {
  const scope = getNodeScope(nodeScope)
  return scope.querySelectorAll(FOCUSABLE_SELECTOR)
}

export const findFirstFocusableNode = nodeScope => {
  const focusableNodes = findFocusableNodes(nodeScope)
  return focusableNodes[0]
}

export const findLastFocusableNode = nodeScope => {
  const focusableNodes = findFocusableNodes(nodeScope)
  return focusableNodes[focusableNodes.length - 1]
}

export const findCurrentFocusedNodeIndex = (currentNode, nodeScope) => {
  if (!isNodeElement(currentNode)) return
  const focusableNodes = findFocusableNodes(nodeScope)
  const currentNodeIndex = Array.prototype.indexOf.call(
    focusableNodes,
    currentNode
  )
  return currentNodeIndex !== -1 ? currentNodeIndex : false
}

export const findNextFocusableNode = (currentNode, nodeScope) => {
  if (!isNodeElement(currentNode)) return

  const scope = getNodeScope(nodeScope)
  const focusableNodes = findFocusableNodes(scope)
  const currentNodeIndex = findCurrentFocusedNodeIndex(currentNode, scope)
  const nextNode =
    currentNodeIndex + 1 <= focusableNodes.length - 1
      ? focusableNodes[currentNodeIndex + 1]
      : scope

  return nextNode
}

export const findPreviousFocusableNode = (currentNode, nodeScope) => {
  if (!isNodeElement(currentNode)) return

  const scope = getNodeScope(nodeScope)
  const focusableNodes = findFocusableNodes(scope)
  const currentNodeIndex = findCurrentFocusedNodeIndex(currentNode, scope)
  const prevNode =
    currentNodeIndex - 1 >= 0 ? focusableNodes[currentNodeIndex - 1] : scope

  return prevNode
}

export const focusNextFocusableNode = (currentNode, nodeScope) => {
  const scope = getNodeScope(nodeScope)
  const node = findNextFocusableNode(currentNode, scope)
  node && node !== document
    ? node.focus()
    : findFirstFocusableNode(nodeScope).focus()
  return node
}

export const focusPreviousFocusableNode = (currentNode, nodeScope) => {
  const scope = getNodeScope(nodeScope)
  const node = findPreviousFocusableNode(currentNode, scope)
  node && node !== document
    ? node.focus()
    : findLastFocusableNode(nodeScope).focus()
  return node
}

/**
 * Method that will find the closest parent that can is focusable
 * @param {HTMLElement} element The element that we are traversing up to find a focusable parent
 * @returns HTMLElement
 */
export function getClosestFocusableParent(element) {
  return element.closest(FOCUSABLE_SELECTOR) || document.body
}

/**
 * Method that will ensure tabbing will cycle between focusable nodes inside a given container
 * @param {HTMLElement} container The Element where the focus should be trapped in
 * @param {Event} e The tab keyboard event
 */
export function manageTrappedFocus(container, e) {
  const focusedNode = e.target
  const isContainerFocused = focusedNode === container

  const focusableNodes = findFocusableNodes(container)

  if (!isNil(focusableNodes)) {
    const focusedNodeIndex = Array.prototype.indexOf.call(
      focusableNodes,
      focusedNode
    )
    const isFirstNode = focusedNodeIndex === 0
    const isLastNode = focusedNodeIndex === focusableNodes.length - 1

    if (!e.shiftKey && isLastNode) {
      e.preventDefault()
      focusableNodes[0].focus()
    } else if (e.shiftKey && (isFirstNode || isContainerFocused)) {
      e.preventDefault()
      focusableNodes[focusableNodes.length - 1].focus()
    }
  }
}
