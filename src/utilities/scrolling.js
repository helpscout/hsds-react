/* istanbul ignore file */
import isNil from 'lodash.isnil'
import computeScrollIntoView from './computeScrollIntoView.lib'

// Source
// https://github.com/paypal/downshift/blob/master/src/utils.js#L25

export const scrollIntoView = (node, rootNode) => {
  if (isNil(node)) return

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
