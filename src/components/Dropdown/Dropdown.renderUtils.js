// Deprecated
/* istanbul ignore file */
import { SELECTORS, isPathActive } from './Dropdown.utils'

// TODO:
// Ensure the correct envNode is passed into these functions.
// At the moment, it assumes window.document, which does not work for iFrames.

export const getIndexFromItemDOMNode = itemNode => {
  const index = itemNode && itemNode.getAttribute(SELECTORS.indexAttribute)
  return index || ''
}

export const getIdFromItemDOMNode = itemNode => {
  const id = itemNode && itemNode.getAttribute('id')
  return id || ''
}

export const getValueFromItemDOMNode = itemNode => {
  const value = itemNode && itemNode.getAttribute(SELECTORS.valueAttribute)
  return value || ''
}

export const findTriggerNode = (envNode = document) => {
  return envNode.querySelector(`[${SELECTORS.triggerAttribute}]`)
}

export const findItemDOMNode = (index, envNode = document) => {
  return envNode.querySelector(`[${SELECTORS.indexAttribute}="${index}"]`)
}

export const findItemDOMNodeById = (item, envNode = document) => {
  return item && item.id && envNode.getElementById(item.id)
}

export const findItemDOMNodes = (envNode = document) => {
  return envNode.querySelectorAll(`[${SELECTORS.indexAttribute}]`)
}

export const findSingleItemDOMNode = (envNode = document) => {
  return envNode.querySelector(`[${SELECTORS.indexAttribute}]`)
}

export const findOpenItemDOMNodes = (
  envNode = document,
  openClassName = 'is-open'
) => {
  return envNode.querySelectorAll(
    `[${SELECTORS.indexAttribute}].${openClassName}`
  )
}

export const findFocusedItemDOMNode = (
  envNode = document,
  focusClassName = 'is-focused'
) => {
  return envNode.querySelector(
    `[${SELECTORS.indexAttribute}].${focusClassName}`
  )
}

export const findFocusedItemDOMNodes = (
  envNode = document,
  focusClassName = 'is-focused'
) => {
  return envNode.querySelectorAll(
    `[${SELECTORS.indexAttribute}].${focusClassName}`
  )
}

export const findMenuDOMNodesFromItemNode = (itemNode, envNode = document) => {
  return itemNode && itemNode.querySelectorAll(`[${SELECTORS.menuAttribute}]`)
}

export const findClosestItemDOMNode = node => {
  return node && node.closest && node.closest(`[${SELECTORS.indexAttribute}]`)
}

export const isDOMNodeValidItem = node => {
  return !!getIndexFromItemDOMNode(node)
}

// Enhancement: Use these functions to calculate sub-menu position on render

export const getSubMenuDOMNodeFromItemDOMNode = itemNode => {
  if (!itemNode) return false
  return itemNode.querySelector(`[${SELECTORS.menuAttribute}]`)
}

export const itemHasSubMenu = itemNode => {
  if (!itemNode) return false
  return !!getSubMenuDOMNodeFromItemDOMNode(itemNode)
}

export const isOpenFromIndex = (path, index) => {
  if (!path || !index) return false
  return isPathActive(path, index) && path !== index
}

export const didOpenSubMenu = (previousIndex, index) => {
  if (!previousIndex || !index) return false
  return previousIndex.length < index.length
}

export const didCloseSubMenu = (previousIndex, index) => {
  if (!previousIndex || !index) return false
  return previousIndex.length > index.length
}

// TODO: Recalculate on EVERY show
// Going to be ignoring chunks of this from test coverage, since DOM related
// calculations are difficult to mock/test within JSDOM.
export const setMenuPositionStyles = props => {
  const defaultProps = {
    dropRight: true,
    dropUp: false,
  }

  const {
    contentWindow,
    dropRight,
    dropUp,
    menuNode,
    itemNode,
    wrapperNode,
    triggerNode,
  } = {
    ...defaultProps,
    ...props,
  }

  if (!menuNode || !itemNode || !wrapperNode || !triggerNode) return

  let translateY

  // Hard-coded dimensions
  const menuOffset = 9
  const menuBuffer = 20

  const { top } = itemNode.getBoundingClientRect()
  const { height } = wrapperNode.getBoundingClientRect()
  const triggerNodeMenu = triggerNode.closest(`[${SELECTORS.menuAttribute}]`)

  const translateYUp = wrapperNode.clientHeight - menuOffset

  translateY =
    triggerNode.offsetHeight +
    (triggerNodeMenu ? triggerNodeMenu.scrollTop : 0) +
    menuOffset

  const predictedOffsetBottom = translateY + height + top
  const predictedFlippedOffsetTop = top - translateY - height

  const shouldDropUp =
    contentWindow.innerHeight < predictedOffsetBottom &&
    predictedFlippedOffsetTop > 0

  if (!dropRight) {
    wrapperNode.style.right = '100%'
    wrapperNode.style.paddingLeft = '0px'
    wrapperNode.style.paddingRight = `${menuBuffer}px`
  } else {
    wrapperNode.style.left = '100%'
    wrapperNode.style.paddingLeft = `${menuBuffer}px`
    wrapperNode.style.paddingRight = '0px'
  }

  if (dropUp) {
    if (shouldDropUp) {
      translateY = translateYUp
    }
  } else {
    if (shouldDropUp) {
      translateY = translateYUp
    }
  }

  wrapperNode.style.transform = `translateY(-${translateY}px)`
}

export const resetSubMenuScrollPositionFromItemNode = itemNode => {
  if (!itemNode) return
  const previousMenuNodes = findMenuDOMNodesFromItemNode(itemNode)
  if (!previousMenuNodes) return

  Array.from(previousMenuNodes).forEach(node => {
    if (node.scrollTop) {
      node.scrollTop = 0
    }
  })
}

export const setAriaActiveOnMenuFromItemNode = itemNode => {
  if (!itemNode) return
  const menuNode = itemNode.closest(`[${SELECTORS.menuAttribute}]`)

  if (!menuNode) return
  const id = getIdFromItemDOMNode(itemNode)

  menuNode.setAttribute('aria-activedescendant', id)
}
