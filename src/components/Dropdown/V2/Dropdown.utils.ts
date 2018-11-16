import * as React from 'react'
import { ItemIndex } from './Dropdown.types'
import { classNames } from '../../../utilities/classNames'
import {
  isFunction,
  isObject,
  isDefined,
  isString,
} from '../../../utilities/is'

export const COMPONENT_KEY = {
  Dropdown: 'Dropdown',
  Trigger: 'Dropdown.Trigger',
  Menu: 'Dropdown.Menu',
  MenuContainer: 'Dropdown.MenuContainer',
  Item: 'Dropdown.Item',
}

export const DELIMETER = '.'

export const SELECTORS = {
  actionAttribute: 'data-hsds-menu-action',
  itemAttribute: 'data-hsds-menu-item',
  menuAttribute: 'data-hsds-menu',
  wrapperAttribute: 'data-hsds-menu-wrapper',
  indexAttribute: 'data-hsds-menu-item-path',
  valueAttribute: 'data-hsds-menu-item-value',
}

export const pathResolve = (...args): string => {
  // @ts-ignore
  const [path, ...rest] = args
  let nextPath = rest.filter(isDefined).join(DELIMETER)

  if (!isDefined(path)) return `${nextPath}`

  if (rest.length) {
    return [path, nextPath].join(DELIMETER)
  }

  return `${path}`
}

export const isPathActive = (path: string, index: string): boolean => {
  if (!isDefined(path)) return false

  const matchPath = path
    .split(DELIMETER)
    .slice(0, index.split(DELIMETER).length)
    .join(DELIMETER)

  return matchPath === index
}

export const getParentPath = (path: string): string => {
  const paths = path.split(DELIMETER)

  if (paths.length <= 1) return `${paths[0]}`

  return paths.slice(0, paths.length - 1).join(DELIMETER)
}

export const getNextChildPath = (path: string): string => {
  return `${path}.0`
}

export const incrementPathIndex = (
  path: string,
  amount: number = 1
): string => {
  const paths = path.split('.')
  const nextIndexBase = paths.pop()

  /* istanbul ignore if */
  if (!nextIndexBase) return path

  const nextIndex = parseInt(nextIndexBase, 10) + amount
  return [...paths, nextIndex].join('.')
}

export const decrementPathIndex = (
  path: string,
  amount: number = 1
): string => {
  const paths = path.split('.')
  const nextIndexBase = paths.pop()

  /* istanbul ignore if */
  if (!nextIndexBase) return path

  let nextIndex = parseInt(nextIndexBase, 10) - amount
  if (nextIndex < 0) {
    nextIndex = 0
  }
  return [...paths, nextIndex].join('.')
}

export const itemIsActive = (selectedItem, item) => {
  if (isObject(item) && isObject(selectedItem)) {
    const { id, value } = selectedItem

    if (isDefined(value) && isDefined(item.value)) {
      return value === item.value
    }

    if (isDefined(id) && isDefined(item.id)) {
      return id === item.id
    }
  }

  if (isString(selectedItem) && isObject(item)) {
    if (isDefined(item.value)) {
      return selectedItem === item.value
    }

    if (isDefined(item.id)) {
      return selectedItem === item.id
    }
  }

  return selectedItem === item
}

export const getItemFromCollection = (
  items: Array<any>,
  value: string | Object
): any => {
  for (const item of items) {
    if (itemIsActive(value, item)) {
      return item
    }
    if (item.items) {
      const child = getItemFromCollection(item.items, value)
      /* istanbul ignore else */
      if (child) return child
    }
  }
  return undefined
}

export const enhanceItemsWithProps = (items: Array<any>, props: Object) => {
  return items.map(item => {
    return {
      ...item,
      ...props,
      items: item.items ? enhanceItemsWithProps(item.items, props) : undefined,
    }
  })
}

export const getCustomItemProps = (props: any): any => {
  const { renderItem, ...rest } = props

  return rest
}

export const itemHasSubMenu = (itemProps: any): boolean => {
  const { items } = itemProps

  return !!(items && items.length)
}

export const renderRenderPropComponent = (
  renderProp: any,
  props: Object = {}
): any => {
  if (React.isValidElement(renderProp)) {
    return React.cloneElement(renderProp, props)
  }
  if (isFunction(renderProp)) {
    return renderProp(props)
  }
  return null
}

// Going to be ignoring chunks of this from test coverage, since DOM related
// calculations are difficult to mock/test within JSDOM.
export const setMenuPositionStyles = (props: {
  dropRight?: boolean
  dropUp?: boolean
  menuNode: HTMLElement | null
  itemNode: HTMLElement
  wrapperNode: HTMLElement | null
  triggerNode: HTMLElement
}) => {
  const defaultProps = {
    dropRight: true,
    dropUp: false,
  }

  const { dropRight, dropUp, menuNode, itemNode, wrapperNode, triggerNode } = {
    ...defaultProps,
    ...props,
  }

  if (!menuNode || !itemNode || !wrapperNode || !triggerNode) return

  let translateY

  // Reset menuNode scroll position
  /* istanbul ignore next */
  if (menuNode.scrollTop) {
    menuNode.scrollTop = 0
  }

  // Hard-coded dimensions
  const menuOffset = 9
  const menuBuffer = 20

  const { top } = itemNode.getBoundingClientRect()
  const { height } = wrapperNode.getBoundingClientRect()
  const triggerNodeMenu = triggerNode.closest(`[${SELECTORS.menuAttribute}]`)

  const translateYUp = wrapperNode.clientHeight - menuOffset

  /* istanbul ignore next */
  translateY =
    triggerNode.offsetHeight +
    (triggerNodeMenu ? triggerNodeMenu.scrollTop : 0) +
    menuOffset

  const predictedOffsetBottom = translateY + height + top
  const predictedFlippedOffsetTop = top - translateY - height

  /* istanbul ignore next */
  const shouldDropUp =
    window.innerHeight < predictedOffsetBottom && predictedFlippedOffsetTop > 0

  /* istanbul ignore next */
  if (!dropRight) {
    wrapperNode.style.right = '100%'
    wrapperNode.style.paddingLeft = '0px'
    wrapperNode.style.paddingRight = `${menuBuffer}px`
  } else {
    wrapperNode.style.left = '100%'
    wrapperNode.style.paddingLeft = `${menuBuffer}px`
    wrapperNode.style.paddingRight = '0px'
  }

  /* istanbul ignore next */
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

export const isDropRight = (state: any): boolean => state.direction === 'right'

export const itemIsHover = (state: any, index: ItemIndex): boolean => {
  const { activeIndex } = state
  if (!activeIndex) return false

  return isPathActive(activeIndex, index)
}

export const itemIsOpen = (state: any, index: ItemIndex): boolean => {
  const { activeIndex } = state
  if (!activeIndex) return false

  return itemIsHover(state, index) && index.length < activeIndex.length
}

export const itemIsSelected = (state: any, index: ItemIndex) => {
  const { activeIndex } = state

  return activeIndex === index
}

export const getItemProps = (state: any, itemProps: any): Object => {
  if (!state) return itemProps

  const { className, index, value, ...rest } = itemProps

  const hasSubMenu = itemHasSubMenu(itemProps)
  const isHover = itemIsHover(state, index)
  const isOpen = itemIsOpen(state, index)
  const isSelected = itemIsSelected(state, index)
  const isActive = itemIsActive(state.selectedItem, itemProps)

  return {
    ...rest,
    className: classNames(
      'c-DropdownV2Item',
      hasSubMenu && 'has-subMenu',
      isHover && 'is-hover',
      isOpen && 'is-open',
      isActive && 'is-active',
      className
    ),
    'aria-selected': isSelected,
    'aria-haspopup': hasSubMenu,
    'aria-expanded': isOpen,
    hasSubMenu,
    isHover,
    isOpen,
    isSelected,
    isActive,
    [SELECTORS.indexAttribute]: index,
    [SELECTORS.valueAttribute]: value,
  }
}

export const getEnhancedItemsWithProps = (
  state: any,
  path?: string
): Array<any> => {
  const { dropUp, id, items, renderItem } = state
  const dropRight = isDropRight(state)

  const enhancedItems = items.map((item, index) => {
    const itemId = pathResolve(id, index)
    const itemIndex = pathResolve(path, index)

    const childItems = item.items
      ? getEnhancedItemsWithProps({ ...state, items: item.items }, itemIndex)
      : undefined

    return {
      ...item,
      ...getItemProps(state, { ...item, index: itemIndex }),
      actionId: pathResolve(itemId, 'action'),
      dropUp,
      dropRight,
      index: itemIndex,
      id: itemId,
      renderItem,
      items: childItems,
      subMenuId: pathResolve(itemId, 'sub-menu'),
    }
  })

  return enhancedItems
}
