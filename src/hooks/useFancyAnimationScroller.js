// very difficult to test with JSDom, some basic interaction is tested in ScrollableContainer
/* istanbul ignore file */
import { useEffect, useRef } from 'react'
import { setupObserver } from './useMeasureNode'

export default function useFancyAnimationScroller({
  container,
  nodeToAnimateFinalHeight,
  selectors,
  topReachedClassNames = 'at-the-top',
}) {
  const lastScrollPosition = useRef(0)
  const initialHeight = useRef(0)
  const containerNode = getElement(container)

  if (containerNode) {
    const nodeToAnimate = containerNode.querySelector(selectors.nodeToAnimate)
    const resizeObserver = setupObserver({
      cb: ({ height }) => {
        if (lastScrollPosition.current === 0) {
          initialHeight.current = height
          nodeToAnimate.classList.add(...[].concat(topReachedClassNames))
        } else if (initialHeight.current === 0) {
          initialHeight.current = height
        }
      },
      dimensions: { height: true },
    })

    resizeObserver.observe(nodeToAnimate)
  }

  useEffect(() => {
    /**
     * Browsers behave differently when "remembering" the scroll position
     * of elements, for example for some reason Chrome doesn't remember
     * on this component while firefox does.
     * Here we make it consistent by just making them all "forget".
     */
    window.addEventListener('unload', restoreScroll)

    return () => {
      window.removeEventListener('unload', restoreScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerNode])

  function restoreScroll() {
    const scrollableNode = containerNode.querySelector(
      selectors.nodeThatScrolls
    )
    scrollableNode.scrollTop = 0
  }

  function handleScroll() {
    const scrollableNode = containerNode.querySelector(
      selectors.nodeThatScrolls
    )
    const scrollableFullHeight = scrollableNode.scrollHeight
    const scrollTop = scrollableNode.scrollTop
    const direction = lastScrollPosition.current < scrollTop ? 'down' : 'up'

    lastScrollPosition.current = scrollTop

    const nodeToAnimateInitialHeight = initialHeight.current
    const nodeToAnimate = containerNode.querySelector(selectors.nodeToAnimate)
    const nodeToAnimateCurrentHeight = nodeToAnimate.getBoundingClientRect()
      .height

    if (direction === 'down') {
      if (nodeToAnimateCurrentHeight > nodeToAnimateFinalHeight) {
        const rate = exponentialDecay(0.05, scrollableFullHeight)(scrollTop)
        const percentage = (rate * 100) / scrollableFullHeight
        const progress =
          (percentage *
            (nodeToAnimateInitialHeight - nodeToAnimateFinalHeight)) /
          100
        const newHeight = nodeToAnimateInitialHeight - progress

        nodeToAnimate.style.height = `${newHeight}px`

        if (newHeight >= nodeToAnimateFinalHeight * 0.75) {
          nodeToAnimate.classList.remove(...[].concat(topReachedClassNames))
        }
      }
    } else {
      if (nodeToAnimateCurrentHeight <= nodeToAnimateInitialHeight) {
        const rate = exponentialDecay(0.01, scrollableFullHeight)(scrollTop)
        const percentage = 100 - (rate * 100) / scrollableFullHeight
        const progress = nodeToAnimateInitialHeight * (percentage / 100)
        const newHeight =
          progress < nodeToAnimateFinalHeight
            ? nodeToAnimateFinalHeight
            : progress

        if (scrollTop !== 0) {
          nodeToAnimate.style.height = `${newHeight}px`
        } else {
          nodeToAnimate.style.height = null
        }

        if (newHeight === nodeToAnimateInitialHeight) {
          nodeToAnimate.classList.add(...[].concat(topReachedClassNames))
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
