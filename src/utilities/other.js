// @flow
export const noop = () => {}

export const requestAnimationFrame = (callback: () => void): mixed => {
  // This method was mostly created for node testing.
  // JSDOM (used by Enzyme) doesn't support requestAnimationFrame.
  /* istanbul ignore next */
  return window.requestAnimationFrame
    ? window.requestAnimationFrame(callback)
    : callback()
}

export const isNodeEnv = () => {
  return (
    typeof process !== 'undefined' &&
    process.title &&
    typeof process.title === 'string' &&
    process.title.toLowerCase().indexOf('node') >= 0
  )
}
