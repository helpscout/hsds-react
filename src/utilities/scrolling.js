import computeScrollIntoView from './computeScrollIntoView.lib'
import { isFirefox } from './browser'
import { isMouseWheelYEvent } from './events'

// Source
// https://github.com/paypal/downshift/blob/master/src/utils.js#L25
/* istanbul ignore next */
export const scrollIntoView = (node, rootNode) => {
  /* istanbul ignore next */
  if (node === null) return
  /* istanbul ignore next */
  const actions = computeScrollIntoView(node, {
    boundary: rootNode,
    block: 'nearest',
    scrollMode: 'if-needed',
  })
  /* istanbul ignore next */
  actions.forEach(({ el, top, left }) => {
    el.scrollTop = top
    el.scrollLeft = left
  })
}

export const remapScrollingPlane = event => {
  // Scrolling behaviour is strange in Firefox…
  // We'll let Firefox natively handle things.
  /* istanbul ignore next */
  // Can't write tests for this in JSDOM.
  // Can't create fixture for JSDOM's built-in Navigator instance.
  if (isFirefox()) return

  const node = event.currentTarget

  // Don't customize native shift + scroll interactions

  if (event.target.shiftKey) return
  if (!node) return
  if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
    return
  }

  if (isMouseWheelYEvent(event)) {
    node.scrollLeft += event.deltaY
  }

  // Scroll-locking
  event.preventDefault()
}
