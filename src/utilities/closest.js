/* istanbul ignore file */
// Source
// https://github.com/ForbesLindesay/closest

const proto = typeof Element !== 'undefined' ? Element.prototype : {}
const vendor =
  proto['matches'] ||
  proto['matchesSelector'] ||
  proto['webkitMatchesSelector'] ||
  proto['mozMatchesSelector'] ||
  proto['msMatchesSelector'] ||
  proto['oMatchesSelector']

export function matches(el, selector) {
  if (!el || el.nodeType !== 1) return false
  if (vendor) return vendor.call(el, selector)

  if (!el.parentNode) return false

  const nodes = el.parentNode.querySelectorAll(selector)

  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] == el) return true
  }

  return false
}

// TODO: remove, move to Beacon (src/components/PreviousMessages/PreviousMessages.LoadMore.js)
export function closest(element, selector, checkYoSelf) {
  let parent = checkYoSelf ? element : element.parentNode

  while (parent && parent !== document) {
    if (matches(parent, selector)) return parent
    parent = parent.parentNode
  }
}

export default closest
