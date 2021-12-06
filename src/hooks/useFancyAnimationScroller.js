import { useRef } from 'react'

export default function useFancyAnimationScroller({
  container,
  targets,
  selectors,
  classNames = {},
}) {
  const lastScrollPosition = useRef(0)

  function handleScroll(e) {
    const containerNode = getElement(container)

    if (containerNode) {
      const { from, to } = targets
      const scrollableNode = containerNode.querySelector(selectors.scrollable)
      const targetNode = containerNode.querySelector(selectors.target)
      const targetNodeHeight = targetNode.getBoundingClientRect().height
      const scrollableFullHeight = scrollableNode.scrollHeight
      const scrollTop = scrollableNode.scrollTop
      const direction = lastScrollPosition.current < scrollTop ? 'down' : 'up'

      lastScrollPosition.current = scrollTop

      if (direction === 'down') {
        if (targetNodeHeight > to) {
          const rate = exponentialDecay(0.05, scrollableFullHeight)(scrollTop)
          const percentage = (rate * 100) / scrollableFullHeight
          const progress = (percentage * (from - to)) / 100
          const newHeight = from - progress

          targetNode.style.height = `${newHeight}px`

          if (classNames.scrollTopReached && newHeight >= to * 0.75) {
            targetNode.classList.add(classNames.scrollTopReached)
          }
        }
      } else {
        if (targetNodeHeight < from) {
          const rate = exponentialDecay(0.01, scrollableFullHeight)(scrollTop)
          const percentage = 100 - (rate * 100) / scrollableFullHeight
          const progress = from * (percentage / 100)
          const newHeight = progress < to ? to : progress

          targetNode.style.height = `${newHeight}px`

          if (classNames.scrollTopReached && newHeight === from) {
            targetNode.classList.remove(classNames.scrollTopReached)
          }
        }
      }
    }
  }

  return [bindRequestAnimationFrame(handleScroll, true)]
}

function getElement(someRef) {
  if (someRef instanceof HTMLElement) return someRef
  return someRef && someRef.current
}

/**
 * Calculates a number from a scale of exponential decay at a given rate.
 * @param {Number} rate The rate of decay, the larger the n umber the quickest the decay
 * @param {Number} upper The limit value
 * @returns Number
 */
export function exponentialDecay(rate, upper) {
  return t => {
    return upper * (1 - Math.exp(-(rate * t)))
  }
}

/**
 * From https://stackoverflow.com/a/44779316
 *
 * @param {Function} fn Callback function
 * @param {Boolean|undefined} [throttle] Optionally throttle callback
 * @return {Function} Bound function
 */
export function bindRequestAnimationFrame(fn, throttle) {
  let isRunning
  let that
  let args

  const run = function () {
    isRunning = false
    fn.apply(that, args)
  }

  return function () {
    that = this
    args = arguments

    if (isRunning && throttle) {
      return
    }

    isRunning = true
    requestAnimationFrame(run)
  }
}
