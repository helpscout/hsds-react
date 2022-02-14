export function noop() {}
export const promiseNoop = () => Promise.resolve()

export const requestAnimationFrame = callback => {
  // This method was mostly created for node testing.
  // JSDOM (used by Enzyme) doesn't support requestAnimationFrame.

  return window.requestAnimationFrame
    ? window.requestAnimationFrame(callback)
    : callback()
}

export const isNodeEnv = () => {
  const process = window.process
  return !!(
    typeof process !== 'undefined' &&
    typeof process.title === 'string' &&
    process.title.toLowerCase().indexOf('node') >= 0
  )
}
