import * as React from 'react'
import { ItemIndex } from './Dropdown.types'
import { getComponentKey } from '../../../utilities/component'
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
  menuRootAttribute: 'data-hsds-menu-root',
  menuAttribute: 'data-hsds-menu',
  wrapperAttribute: 'data-hsds-menu-wrapper',
  indexAttribute: 'data-hsds-menu-item-path',
  valueAttribute: 'data-hsds-menu-item-value',
}

/**
 * Path Helpers
 */
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

export const isPathActive = (path?: string, index?: string): boolean => {
  if (!isDefined(path)) return false
  if (!isDefined(index)) return false

  // @ts-ignore
  const matchPath = path
    .split(DELIMETER)
    // @ts-ignore
    .slice(0, index.split(DELIMETER).length)
    .join(DELIMETER)

  return matchPath === index
}

export const getParentPath = (path: string): string => {
  if (!isDefined(path)) return ''

  const paths = path.split(DELIMETER)

  if (paths.length <= 1) return `${paths[0]}`

  return paths.slice(0, paths.length - 1).join(DELIMETER)
}

export const getNextChildPath = (path: string): string => {
  if (!isDefined(path)) return ''

  return `${path}${DELIMETER}0`
}

export const incrementPathIndex = (
  path: string,
  amount: number = 1
): string => {
  const paths = path.split(DELIMETER)
  const nextIndexBase = paths.pop()

  /* istanbul ignore if */
  if (!nextIndexBase) return path

  const nextIndex = parseInt(nextIndexBase, 10) + amount
  return [...paths, nextIndex].join(DELIMETER)
}

export const decrementPathIndex = (
  path: string,
  amount: number = 1
): string => {
  const paths = path.split(DELIMETER)
  const nextIndexBase = paths.pop()

  /* istanbul ignore if */
  if (!nextIndexBase) return path

  let nextIndex = parseInt(nextIndexBase, 10) - amount
  if (nextIndex < 0) {
    nextIndex = 0
  }
  return [...paths, nextIndex].join(DELIMETER)
}

/**
 * Item Helpers
 */
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

export const hasGroups = (items: Array<any>): boolean => {
  return !!items.find(i => i.type === 'group')
}

export const flattenGroupedItems = (items: Array<any>): Array<any> => {
  return items.reduce((collection, group) => {
    const { items, ...groupHeader } = group
    return [...collection, groupHeader, ...items]
  }, [])
}

export const filterGroupHeaderFromItems = (item: any): boolean => {
  return !(item && item.type && item.type === 'group')
}

export const filterDisabledFromItems = (item: any): boolean => {
  return !(item && item.disabled === true)
}

export const filterDividerFromItems = (item: any): boolean => {
  return !(item && item.type && item.type === 'divider')
}

export const filterNonFocusableItemFromItems = (item: any): boolean => {
  return filterDisabledFromItems(item) && filterDividerFromItems(item)
}

export const getIndexMapFromItems = (
  items: Array<any>,
  path?: string
): Array<any> => {
  let collection = items

  if (hasGroups(items)) {
    collection = flattenGroupedItems(items).filter(filterGroupHeaderFromItems)
  }

  collection = collection.filter(filterNonFocusableItemFromItems)

  return collection.reduce((indexMap, item, index) => {
    const itemIndex = pathResolve(path, index)
    const childItems = item.items
      ? getIndexMapFromItems(item.items, itemIndex)
      : {}

    if (!indexMap[itemIndex]) {
      indexMap
    }

    return { ...indexMap, [itemIndex]: item.value, ...childItems }
  }, {})
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
  return state.index === index
}

export const getItemProps = (
  state: any,
  item: any,
  index?: string | number
): Object => {
  const { dropUp, id, enableTabNavigation, indexMap, selectedItem } = state
  const { className, value, ...rest } = item
  const dropRight = isDropRight(state)

  let itemIndex = Object.keys(indexMap).find(key => indexMap[key] === value)

  if (isDefined(index)) {
    // @ts-ignore
    itemIndex = !isString(index) ? index.toString() : index
  }

  const isActive = itemIsActive(selectedItem, item)
  const hasSubMenu = itemHasSubMenu(item)
  const isSelected = itemIsSelected(state, itemIndex as string)
  const childItems = item.items
    ? item.items.map(item => getItemProps(state, item))
    : undefined

  const itemId = pathResolve(id, itemIndex)
  const key = item.id || item.value || getComponentKey(item, index)

  return {
    ...rest,
    className: classNames(
      'c-DropdownV2Item',
      hasSubMenu && 'has-subMenu',
      isActive && 'is-active',
      className
    ),
    'aria-haspopup': hasSubMenu,
    [SELECTORS.indexAttribute]: itemIndex,
    [SELECTORS.valueAttribute]: value,
    actionId: pathResolve(itemId, 'action'),
    key,
    role: 'option',
    index: itemIndex,
    dropRight,
    dropUp,
    id: itemId,
    isActive,
    isSelected,
    hasSubMenu,
    items: childItems,
    subMenuId: pathResolve(itemId, 'sub-menu'),
    tabIndex: enableTabNavigation ? 0 : null,
    value,
  }
}
