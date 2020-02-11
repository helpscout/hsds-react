/**
 * A wrapper for addEventListener for DOM nodes.
 *
 * @param   {NodeElement} target
 * @param   {string} eventName
 * @param   {function} handler
 * @param   {object} options
 *
 * @returns {undefined}
 */
export const addEventListener = (target, eventName, handler, options) => {
  /* istanbul ignore next */
  if (!target || !target.addEventListener) return
  /* istanbul ignore next */
  return target.addEventListener(eventName, handler, options)
}

/**
 * A wrapper for removeEventListener for DOM nodes.
 *
 * @param   {NodeElement} target
 * @param   {string} eventName
 * @param   {function} handler
 * @param   {object} options
 *
 * @returns {undefined}
 */
export const removeEventListener = (target, eventName, handler, options) => {
  /* istanbul ignore next */
  if (!target || !target.removeEventListener) return
  /* istanbul ignore next */
  return target.removeEventListener(eventName, handler, options)
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
  const computedDeltaY = Math.abs(deltaY) * wheelMultiplier / 120 * 10

  if (computedDeltaX !== neutralX) return false

  return computedDeltaY >= wheelThreshold
}
