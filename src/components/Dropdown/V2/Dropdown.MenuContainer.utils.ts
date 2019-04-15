type ClientRect = {
  height: number
  left: number
  top: number
}

export const getComputedClientRect = (node: HTMLElement): ClientRect => {
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
  const computedTop = top + height + window.scrollY
  const computedLeft = left + window.scrollX

  return {
    left: computedLeft,
    top: computedTop,
    height,
  }
}
