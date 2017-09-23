export const FOCUSABLE_SELECTOR = 'a,frame,iframe,input:not([type=hidden]),select,textarea,button,*[tabindex]:not([tabindex="-1"])'

const Element = window.Element

export const getNodeScope = (nodeScope) => {
  return nodeScope || nodeScope instanceof Element === true ? nodeScope : document
}

export const findFocusableNodes = (nodeScope) => {
  const scope = getNodeScope(nodeScope)
  return scope.querySelectorAll(FOCUSABLE_SELECTOR)
}

export const findFirstFocusableNode = (nodeScope) => {
  const focusableNodes = findFocusableNodes(nodeScope)
  return focusableNodes[0]
}

export const findLastFocusableNode = (nodeScope) => {
  const focusableNodes = findFocusableNodes(nodeScope)
  return focusableNodes[focusableNodes.length - 1]
}

export const findCurrentFocusedNodeIndex = (currentNode, nodeScope) => {
  if (currentNode instanceof Element !== true) return
  const focusableNodes = findFocusableNodes(nodeScope)
  const currentNodeIndex = Array.prototype.indexOf.call(focusableNodes, currentNode)
  return currentNodeIndex !== -1 ? currentNodeIndex : false
}

export const findNextFocusableNode = (currentNode, nodeScope) => {
  if (currentNode instanceof Element !== true) return

  const scope = getNodeScope(nodeScope)
  const focusableNodes = findFocusableNodes(scope)
  const currentNodeIndex = findCurrentFocusedNodeIndex(currentNode, scope)
  const nextNode = currentNodeIndex + 1 <= focusableNodes.length - 1 ? focusableNodes[currentNodeIndex + 1] : scope

  return nextNode
}

export const findPreviousFocusableNode = (currentNode, nodeScope) => {
  if (currentNode instanceof Element !== true) return

  const scope = getNodeScope(nodeScope)
  const focusableNodes = findFocusableNodes(scope)
  const currentNodeIndex = findCurrentFocusedNodeIndex(currentNode, scope)
  const prevNode = currentNodeIndex - 1 >= 0 ? focusableNodes[currentNodeIndex - 1] : scope

  return prevNode
}

export const focusNextFocusableNode = (currentNode, nodeScope) => {
  const scope = getNodeScope(nodeScope)
  const node = findNextFocusableNode(currentNode, scope)
  node && node !== document ? node.focus() : findFirstFocusableNode(nodeScope).focus()
  return node
}

export const focusPreviousFocusableNode = (currentNode, nodeScope) => {
  const scope = getNodeScope(nodeScope)
  const node = findPreviousFocusableNode(currentNode, scope)
  node && node !== document ? node.focus() : findLastFocusableNode(nodeScope).focus()
  return node
}
