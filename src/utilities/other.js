export function noop () {}

export const requestAnimationFrame = (callback) => {
  // This method was mostly created for node testing.
  // JSDOM (used by Enzyme) doesn't support requestAnimationFrame.
  /* istanbul ignore next */
  window.requestAnimationFrame ? window.requestAnimationFrame(callback) : callback()
}
