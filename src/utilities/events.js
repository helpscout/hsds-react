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
