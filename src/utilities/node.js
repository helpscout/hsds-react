import { isNodeEnv } from './other'

export const Element = window.Element

export const isNodeElement = (node) => {
  return node && (node instanceof Element || node === document)
}

export const getNodeScope = (nodeScope) => {
  return nodeScope && isNodeElement(nodeScope) ? nodeScope : document
}

export const applyStylesToNode = (node, styles = {}) => {
  if (!node) return false
  if (!isNodeElement(node)) return node
  if (typeof styles !== 'object') return node

  Object.keys(styles).forEach(prop => {
    const value = styles[prop]
    node.style[prop] = typeof value === 'number' && prop !== 'zIndex' ? `${value}px` : value
  })

  return node
}

export const getComputedHeightProps = (node) => {
  if (!isNodeElement(node)) return
  const el = node !== document ? node : document.body
  const height = el.offsetHeight

  const {
    marginTop,
    marginBottom,
    paddingTop,
    paddingBottom
  } = window.getComputedStyle(el)

  // Adjust for node environments (for testing purposes)
  let offset = parseFloat(marginTop) + parseFloat(marginBottom)
  /* istanbul ignore next */
  if (!isNodeEnv()) {
    offset = offset + parseFloat(paddingTop) + parseFloat(paddingBottom)
  }

  return {
    height,
    offset
  }
}

export const getComputedWidthProps = (node) => {
  if (!isNodeElement(node)) return
  const el = node !== document ? node : document.body
  const width = el.offsetWidth

  const {
    marginLeft,
    marginRight,
    paddingLeft,
    paddingRight
  } = window.getComputedStyle(el)

  // Adjust for node environments (for testing purposes)
  let offset = parseFloat(marginLeft) + parseFloat(marginRight)
  /* istanbul ignore next */
  if (!isNodeEnv()) {
    offset = offset + parseFloat(paddingLeft) + parseFloat(paddingRight)
  }

  return {
    width,
    offset
  }
}

export const getComputedOffsetTop = (node) => {
  if (!isNodeElement(node)) return
  const offset = getComputedHeightProps(document).offset
  return node.getBoundingClientRect().top + (offset / 2)
}

export const getComputedOffsetLeft = (node) => {
  if (!isNodeElement(node)) return
  const offset = getComputedWidthProps(document).offset
  return node.getBoundingClientRect().left + (offset / 2)
}

export const getViewportHeight = (scope) => {
  const node = getNodeScope(scope)
  const { height, offset } = getComputedHeightProps(node)

  /* istanbul ignore next */
  // Tested one case, but cannot test the other in JSDOM
  return height > window.innerHeight ? height : window.innerHeight - offset
}

export const getViewportWidth = (scope) => {
  const node = getNodeScope(scope)
  const { width, offset } = getComputedWidthProps(node)

  /* istanbul ignore next */
  // Tested one case, but cannot test the other in JSDOM
  return width > window.innerWidth ? width : window.innerWidth - offset
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
  const totalOffset = triggerOffset + boundingOffset
  let directionX = direction && direction.x ? direction.x : ''
  let directionY = direction && direction.y ? direction.y : 'down'

  let top
  let left

  directionX = directionX === 'right' && offsetLeft + width + totalOffset > viewportWidth ? 'left'
    : directionX === 'left' && offsetLeft - width - totalOffset < 0 ? 'right'
    : directionX

  directionY = directionY === 'down' && posSize + height + totalOffset > viewportHeight && posSize - height - totalOffset > 0 ? 'up'
    : directionY === 'up' && posSize - height - totalOffset < 0 ? 'down'
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
    top,
    left,
    offsetTop,
    offsetLeft,
    offset: totalOffset,
    direction: {
      x: directionX,
      y: directionY
    }
  }
}
