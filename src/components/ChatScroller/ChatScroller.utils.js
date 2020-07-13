import { allDefined } from '../../utilities/check'

/**
 * Determines if the ChatScroller is within range of scrolling.
 *
 * @param   {Object} props
 * @returns {boolean}
 */
export function shouldAutoScroll(props) {
  if (!allDefined(props)) return false

  const { distanceForAutoScroll, scrollHeight, scrollTop } = props

  return scrollTop + distanceForAutoScroll >= scrollHeight
}

/**
 * Transforms, calculates, and defines props for scrolling.
 *
 * @param   {Object} props
 * @returns {Object}
 */
export function getScrollProps(props) {
  if (!allDefined(props)) return {}

  const {
    distanceForAutoScroll,
    messageNode,
    offsetThreshold,
    scrollableNode,
  } = props

  const scrollableHeight = scrollableNode.clientHeight
  const scrollHeight = scrollableNode.scrollHeight
  const scrollTop =
    scrollableNode.scrollTop + scrollableHeight + messageNode.clientHeight

  const topOffset = scrollableHeight * offsetThreshold * -1
  const position = messageNode.offsetTop + topOffset

  return {
    distanceForAutoScroll,
    position,
    scrollHeight,
    scrollTop,
  }
}
