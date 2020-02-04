type ClientRect = {
  height: number
  left: number
  top: number
}

export const getComputedClientRect = (
  node: HTMLElement,
  contentWindow: any
): ClientRect => {
  const defaultRect = {
    height: 0,
    left: 0,
    top: 0,
  }

  if (!node) return defaultRect

  const rect = node.getBoundingClientRect()
  const { height, top, left } = rect

  // window.scrollY / window.scrollX cannot be modified (or easily mocked)
  // within JSDOM. Manually tested in the browser, and the calculations are
  // correct.
  /* istanbul ignore next */
  const computedTop = top + height + contentWindow.scrollY
  const computedLeft = left + contentWindow.scrollX

  return {
    left: computedLeft,
    top: computedTop,
    height,
  }
}
