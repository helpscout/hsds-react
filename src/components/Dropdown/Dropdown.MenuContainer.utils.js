// Deprecated
/* istanbul ignore file */
export const getComputedClientRect = (node, contentWindow) => {
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

  const computedTop = top + height + contentWindow.scrollY
  const computedLeft = left + contentWindow.scrollX

  return {
    left: computedLeft,
    top: computedTop,
    height,
  }
}
