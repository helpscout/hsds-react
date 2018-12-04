// Source
// https://github.com/ForbesLindesay/closest

const proto: Object = typeof Element !== 'undefined' ? Element.prototype : {}
const vendor: Function =
  proto['matches'] ||
  proto['matchesSelector'] ||
  proto['webkitMatchesSelector'] ||
  proto['mozMatchesSelector'] ||
  proto['msMatchesSelector'] ||
  proto['oMatchesSelector']

export function matches(el: HTMLElement | Node, selector: string): boolean {
  if (!el || el.nodeType !== 1) return false
  if (vendor) return vendor.call(el, selector)

  if (!el.parentNode) return false

  const nodes = el.parentNode.querySelectorAll(selector)

  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] == el) return true
  }

  return false
}

export function closest(
  element: HTMLElement | any,
  selector: string,
  checkYoSelf?: any
): any {
  let parent = checkYoSelf ? element : element.parentNode

  while (parent && parent !== document) {
    if (matches(parent, selector)) return parent
    parent = parent.parentNode
  }
}

export default closest
