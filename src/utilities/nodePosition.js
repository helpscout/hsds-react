import { isNodeEnv } from './other'
import { isNodeElement, getViewportHeight, getViewportWidth } from './node'

export const getDirectionX = (direction) => {
  const defaultDirection = ''
  if (typeof direction !== 'string') return defaultDirection
  // No defaults
  return direction.match(/left/) ? 'left'
    : direction.match(/right/) ? 'right'
    : ''
}

export const getDirectionY = (direction) => {
  const defaultDirection = 'down'
  if (typeof direction !== 'string') return defaultDirection
  // Default to down
  return direction.match(/up/) ? 'up'
    : direction.match(/down/) ? 'down'
    : 'down'
}

export const getDirections = (direction) => {
  return {
    x: getDirectionX(direction),
    y: getDirectionY(direction)
  }
}

export const getOptimalViewportPosition = (options) => {
  if (!options && typeof options !== 'object') return false

  const { triggerNode, contentNode, offset, direction } = options
  if (!isNodeElement(triggerNode) || !isNodeElement(contentNode)) return false

  const pos = triggerNode.getBoundingClientRect()
  const nodePos = contentNode.getBoundingClientRect()
  const height = nodePos.height
  const width = nodePos.width
  const boundingOffset = 8
  // The following vars are tested. However, they can only be tested for pos.top/pos.left vs other
  // ternary outcomes. This is due to a limitation of JSDOM not supporting offsetTop/offsetLeft.
  // Which is why the ternary begins by checking if the environment is node based.
  /* istanbul ignore next */
  const offsetTop = isNodeEnv() ? pos.top : pos.top > triggerNode.offsetTop ? pos.top : triggerNode.offsetTop
  /* istanbul ignore next */
  const offsetLeft = isNodeEnv() ? pos.left : pos.left > triggerNode.offsetLeft ? pos.left : triggerNode.offsetLeft
  const viewportHeight = getViewportHeight()
  const viewportWidth = getViewportWidth()
  const posSize = offsetTop + pos.height
  /* istanbul ignore next */
  // Tested, but istanbul isn't picking it up
  const triggerOffset = typeof offset !== 'undefined' ? offset : 0
  const triggerWidth = pos.width
  const totalOffset = triggerOffset + boundingOffset
  let directionX = direction && direction.x ? direction.x : ''
  let directionY = direction && direction.y ? direction.y : 'down'

  let top
  let left

  const totalOffsetWidthRight = offsetLeft + width + totalOffset + triggerWidth
  const totalOffsetWidthLeft = offsetLeft - width - totalOffset
  const totalOffsetHeightDown = posSize + height + totalOffset
  const totalOffsetHeightUp = posSize - height - totalOffset

  directionX = directionX === 'right' && totalOffsetWidthRight > viewportWidth && totalOffsetWidthLeft > 0 ? 'left'
    : directionX === 'left' && totalOffsetWidthLeft < 0 ? 'right'
    : directionX

  directionY = directionY === 'down' && totalOffsetHeightDown > viewportHeight && totalOffsetHeightUp > 0 ? 'up'
    : directionY === 'up' && totalOffsetHeightUp < 0 ? 'down'
    : directionY

  switch (directionY) {
    case 'up' :
      top = offsetTop - triggerOffset - height
      break

    case 'down' :
      top = offsetTop + pos.height + triggerOffset
      break
  }

  switch (directionX) {
    case 'left' :
      left = offsetLeft - triggerOffset - nodePos.width
      if (directionY === 'down') {
        top = offsetTop
      } else {
        top = offsetTop - height + pos.height
      }
      break

    case 'right' :
      left = offsetLeft + pos.width + triggerOffset
      if (directionY === 'down') {
        top = offsetTop
      } else {
        top = offsetTop - nodePos.height + pos.height
      }
      break

    default :
      left = offsetLeft
      break
  }

  return {
    top: parseInt(top),
    left: parseInt(left),
    offsetTop: parseInt(offsetTop),
    offsetLeft: parseInt(offsetLeft),
    offset: parseInt(totalOffset),
    direction: {
      x: directionX,
      y: directionY
    }
  }
}
