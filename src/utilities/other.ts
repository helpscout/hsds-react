type Noop = () => void

export const noop: Noop = () => undefined
export const promiseNoop: any = () => Promise.resolve()

export const requestAnimationFrame = (
  callback: FrameRequestCallback | Noop
): any => {
  // This method was mostly created for node testing.
  // JSDOM (used by Enzyme) doesn't support requestAnimationFrame.
  /* istanbul ignore next */
  return window.requestAnimationFrame
    ? window.requestAnimationFrame(<FrameRequestCallback>callback)
    : (<Noop>callback)()
}

export const isNodeEnv = (): boolean => {
  return !!(
    typeof process !== 'undefined' &&
    typeof process.title === 'string' &&
    process.title.toLowerCase().indexOf('node') >= 0
  )
}
