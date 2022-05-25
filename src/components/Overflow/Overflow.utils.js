import { isNodeElement } from '@hsds/utils-dom'

const isFirefox = () => {
  if (!navigator) return false

  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1
}
/**
 * Determines if a wheel event came from a mouse or from a trackpad.
 *
 * There is not native way to do this in the browser. To calculate this,
 * various assumptions were made on the delta + threshold values.
 *
 * This function isn't full-proof, as a VERY hard trackpad swipe will
 * result in a true (due to it's higher delta value).
 *
 * Note: This is not effective at all in Firefox, since their delta values
 * are completely off compared to other browsers.
 *
 * @param   {WheelEvent} event
 *
 * @returns {boolean}
 */

export const isMouseWheelYEvent = (event = {}) => {
  const { deltaX, deltaY } = event

  if (deltaX === undefined || deltaY === undefined) return false

  // Wheel scrolls always have an x value of 0
  const neutralX = 0
  // Enlarges the data set for more precise calculations
  const wheelMultiplier = 240
  // Limiter
  const wheelThreshold = 480
  // Values for calculation
  const computedDeltaX = deltaX * (wheelMultiplier * -1)
  const computedDeltaY = ((Math.abs(deltaY) * wheelMultiplier) / 120) * 10

  if (computedDeltaX !== neutralX) return false

  return computedDeltaY >= wheelThreshold
}

export const remapScrollingPlane = event => {
  // Scrolling behaviour is strange in Firefox…
  // We'll let Firefox natively handle things.

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

export const hasContentOverflowX = node => {
  if (!isNodeElement(node)) return false
  return node.clientWidth < node.scrollWidth
}
