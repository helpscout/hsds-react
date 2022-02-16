/* istanbul ignore file */
import { isNodeElement } from './node'
import { requestAnimationFrame } from './other'
import isFunction from 'lodash.isfunction'

// Source:
// https://gist.github.com/gre/1650294

export const linear = t => t
export const easeInOutCubic = t => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

// Source
// https://jsfiddle.net/s61x7c4e/
//
// Testing:
// Note: This function cannot be tested in JSDOM. JSDOM lacks the
// necessary DOM node numbers (like scrollY or scrollTop) to test
// the calculations for this method. These numbers cannot be
// mocked/faked :(.
//
// To properly test this method, we'll need to leverage ACTUAL
// browser testing somehow (either in-browser or headless).
//
// For now, this method has been extensively tested manually
// within Storybook.
export const smoothScrollTo = ({
  node,
  position,
  duration,
  direction,
  callback,
  timingFunction,
}) => {
  const scrollNode = isNodeElement(node) ? node : window
  const isWindow = scrollNode === window
  const scrollDuration = duration || 500
  const scrollDirection = direction || 'y'
  const isHorizontalScroll = scrollDirection === 'x'
  const scrollTimingFunction = timingFunction || easeInOutCubic

  let currentScrollPosition = isWindow ? window.scrollY : scrollNode.scrollTop
  if (isHorizontalScroll) {
    currentScrollPosition = isWindow ? window.scrollX : scrollNode.scrollLeft
  }

  let diff = currentScrollPosition - position
  let start

  if (!diff) return

  const step = timestamp => {
    if (!start) start = timestamp
    // Elapsed miliseconds since start of scrolling.
    const time = timestamp - start
    // Get percent of completion in range [0, 1].
    const percent = scrollTimingFunction(Math.min(time / scrollDuration, 1))
    const scrollToPosition = currentScrollPosition - diff * percent

    if (node.scrollTo) {
      if (isHorizontalScroll) {
        node.scrollTo(scrollToPosition, 0)
      } else {
        node.scrollTo(0, scrollToPosition)
      }
    } else {
      if (isHorizontalScroll) {
        node.scrollLeft = scrollToPosition
      } else {
        node.scrollTop = scrollToPosition
      }
    }

    // Proceed with animation as long as we wanted it to.
    if (time < scrollDuration) {
      requestAnimationFrame(step)
    } else {
      if (isFunction(callback)) {
        callback()
      }
    }
  }

  requestAnimationFrame(step)
}
