import { ItemIndex } from './Dropdown.types'
import { initialState } from './Dropdown.store'
import { getComponentKey } from '../../../utilities/component'
import { classNames } from '../../../utilities/classNames'
import { isObject, isDefined, isArray, isString } from '../../../utilities/is'

export const DELIMETER = '.'

export const SELECTORS = {
  actionAttribute: 'data-hsds-dd-menu-action',
  itemAttribute: 'data-hsds-dd-menu-item',
  menuRootAttribute: 'data-hsds-dd-menu-root',
  menuAttribute: 'data-hsds-dd-menu',
  wrapperAttribute: 'data-hsds-dd-menu-wrapper',
  indexAttribute: 'data-hsds-dd-menu-item-path',
  triggerAttribute: 'data-hsds-dd-menu-trigger',
  valueAttribute: 'data-hsds-dd-menu-item-value',
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
  if (Array.isArray(selectedItem)) {
    for (const selItem of selectedItem) {
      if (itemIsActive(selItem, item)) return true
    }
    return false
  }

  if (isObject(item) && isObject(selectedItem)) {
    const { id, value } = selectedItem

    if (isDefined(value) && isDefined(item.value)) {
      // Loose comparison, as number/string values may match
      return value == item.value
    }

    if (isDefined(id) && isDefined(item.id)) {
      return id === item.id
    }
  }

  if (isString(selectedItem) && isObject(item)) {
    if (isDefined(item.value)) {
      // Loose comparison, as number/string values may match
      return selectedItem == item.value
    }

    if (isDefined(item.id)) {
      return selectedItem === item.id
    }
  }

  return selectedItem === item
}

export const processSelectionOfItem = (currentSelection, item) => {
  let removed = false
  let selection: any[] = []

  for (const presentItem of currentSelection) {
    if (itemIsActive(presentItem, item)) {
      removed = true
    } else {
      selection.push(presentItem)
    }
  }

  return removed ? selection : selection.concat(item)
}

export const getItemFromCollection = (
  items: Array<any>,
  value: string | Object
): any => {
  for (const item of items) {
    if (itemIsActive(value, item)) {
      return item
    }
    /* istanbul ignore else */
    if (item.items) {
      const child = getItemFromCollection(item.items, value)
      /* istanbul ignore else */
      if (child) return child
    }
  }
  return undefined
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

export const isItemsEmpty = (items: Array<any>): boolean => {
  let collection = items

  if (hasGroups(items)) {
    collection = flattenGroupedItems(items).filter(
      item => item.type !== 'group'
    )
  }

  return collection.length === 0
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

export const getUniqueKeyFromItem = item => {
  return item && (item.id || item.value || item.label)
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

    /* istanbul ignore else */
    if (!indexMap[itemIndex]) {
      indexMap
    }

    const key = getUniqueKeyFromItem(item)

    return { ...indexMap, [itemIndex]: key, ...childItems }
  }, {})
}

export const isDropRight = (state: any): boolean => state.direction === 'right'

export const itemIsHover = (state: any, itemIndex: ItemIndex): boolean => {
  const { index } = state
  if (!index) return false

  return isPathActive(index, itemIndex)
}

export const itemIsOpen = (state: any, itemIndex: ItemIndex): boolean => {
  const { index } = state
  if (!index) return false

  return itemIsHover(state, itemIndex) && itemIndex.length < index.length
}

export const itemIsSelected = (state: any, itemIndex: ItemIndex) => {
  return state.index === itemIndex
}

export const getItemProps = (
  state: any,
  item: any,
  index?: string | number
): Object => {
  if (!state) return item

  const { dropUp, id, enableTabNavigation, indexMap, selectedItem } = state
  const { className, value, ...rest } = item
  const dropRight = isDropRight(state)
  const indexKey = getUniqueKeyFromItem(item)

  let itemIndex

  /* istanbul ignore else */
  if (indexMap) {
    itemIndex = Object.keys(indexMap).find(key => indexMap[key] === indexKey)
  }

  /* istanbul ignore if */
  if (isDefined(index)) {
    // @ts-ignore
    itemIndex = !isString(index) ? index.toString() : index
  }

  const isActive = itemIsActive(selectedItem, item)
  const hasSubMenu = itemHasSubMenu(item)
  const isSelected = itemIsSelected(state, itemIndex as string)

  const itemId = pathResolve(id, itemIndex)

  const key =
    getComponentKey(item, index) ||
    indexKey ||
    /* istanbul ignore next */
    `unsafeComponentKey-${item.toString()}`

  return {
    ...rest,
    className: classNames(
      'c-DropdownV2Item',
      /* istanbul ignore next */
      hasSubMenu && 'has-subMenu',
      isActive && 'is-active',
      className
    ),
    'aria-selected': isSelected,
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
    subMenuId: pathResolve(itemId, 'sub-menu'),
    tabIndex: enableTabNavigation ? 0 : null,
    value,
  }
}

export const filterNonStoreProps = props => {
  const storeKeys = Object.keys(initialState)

  return storeKeys.reduce((nextProps, key) => {
    if (props.hasOwnProperty(key)) {
      return { ...nextProps, [key]: props[key] }
    }
    return nextProps
  }, {})
}

export const isSelectedItemEmpty = selectedItem => {
  if (selectedItem == null) return true
  if (selectedItem === '') return true
  if (isArray(selectedItem) && selectedItem.length === 0) return true
  return false
}

export const getSelectedItemIndex = state => {
  const { selectedItem, indexMap } = state
  const selectedKey = getUniqueKeyFromItem(selectedItem)

  return Object.keys(indexMap).find(key => indexMap[key] === selectedKey)
}
