import computeScrollIntoView from './computeScrollIntoView.lib'

// Source
// https://github.com/paypal/downshift/blob/master/src/utils.js#L25

export const scrollIntoView = (node, rootNode) => {
  if (node === null) return

  const actions = computeScrollIntoView(node, {
    boundary: rootNode,
    block: 'nearest',
    scrollMode: 'if-needed',
  })

  actions.forEach(({ el, top, left }) => {
    el.scrollTop = top
    el.scrollLeft = left
  })
}
