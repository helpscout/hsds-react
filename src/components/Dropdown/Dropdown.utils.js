// Deprecated
/* istanbul ignore file */
import { initialState } from './Dropdown.store'
import { getComponentKey } from '../../utilities/component'
import classNames from 'classnames'
import isNil from 'lodash.isnil'
import isString from 'lodash.isstring'
import isPlainObject from 'lodash.isplainobject'

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
export const pathResolve = (...args) => {
  const [path, ...rest] = args
  let nextPath = rest.filter(p => !isNil(p)).join(DELIMETER)

  if (isNil(path)) return `${nextPath}`

  if (rest.length) {
    return [path, nextPath].join(DELIMETER)
  }

  return `${path}`
}

export const isPathActive = (path, index) => {
  if (isNil(path)) return false
  if (isNil(index)) return false

  const matchPath = path
    .split(DELIMETER)

    .slice(0, index.split(DELIMETER).length)
    .join(DELIMETER)

  return matchPath === index
}

export const getParentPath = path => {
  if (isNil(path)) return ''

  const paths = path.split(DELIMETER)

  if (paths.length <= 1) return `${paths[0]}`

  return paths.slice(0, paths.length - 1).join(DELIMETER)
}

export const getNextChildPath = path => {
  if (isNil(path)) return ''

  return `${path}${DELIMETER}0`
}

export const incrementPathIndex = (path, amount = 1) => {
  const paths = path.split(DELIMETER)
  const nextIndexBase = paths.pop()

  if (!nextIndexBase) return path

  const nextIndex = parseInt(nextIndexBase, 10) + amount
  return [...paths, nextIndex].join(DELIMETER)
}

export const decrementPathIndex = (path, amount = 1) => {
  const paths = path.split(DELIMETER)
  const nextIndexBase = paths.pop()

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

  if (isPlainObject(item) && isPlainObject(selectedItem)) {
    const { id, value } = selectedItem

    if (!isNil(value) && !isNil(item.value)) {
      // Loose comparison, as number/string values may match
      return value == item.value
    }

    if (!isNil(id) && !isNil(item.id)) {
      return id === item.id
    }
  }

  if (isString(selectedItem) && isPlainObject(item)) {
    if (!isNil(item.value)) {
      // Loose comparison, as number/string values may match
      return selectedItem == item.value
    }

    if (!isNil(item.id)) {
      return selectedItem === item.id
    }
  }

  return selectedItem === item
}

export const processSelectionOfItem = (currentSelection, item) => {
  let removed = false
  let selection = []

  for (const presentItem of currentSelection) {
    if (itemIsActive(presentItem, item)) {
      removed = true
    } else {
      selection.push(presentItem)
    }
  }

  return removed ? selection : selection.concat(item)
}

export const getItemFromCollection = (items, value) => {
  for (const item of items) {
    if (itemIsActive(value, item)) {
      return item
    }

    if (item.items) {
      const child = getItemFromCollection(item.items, value)

      if (child) return child
    }
  }
  return undefined
}

export const getCustomItemProps = props => {
  const { renderItem, ...rest } = props

  return rest
}

export const itemHasSubMenu = itemProps => {
  const { items } = itemProps

  return !!(items && items.length)
}

export const hasGroups = items => {
  return !!items.find(i => i.type === 'group')
}

export const flattenGroupedItems = items => {
  return items.reduce((collection, group) => {
    const { items, ...groupHeader } = group
    return [...collection, groupHeader, ...items]
  }, [])
}

export const isItemsEmpty = items => {
  let collection = items

  if (hasGroups(items)) {
    collection = flattenGroupedItems(items).filter(
      item => item.type !== 'group'
    )
  }

  return collection.length === 0
}

export const filterGroupHeaderFromItems = item => {
  return !(item && item.type && item.type === 'group')
}

export const filterDisabledFromItems = item => {
  return !(item && item.disabled === true)
}

export const filterDividerFromItems = item => {
  return !(item && item.type && item.type === 'divider')
}

export const filterNonFocusableItemFromItems = item => {
  return filterDisabledFromItems(item) && filterDividerFromItems(item)
}

export const getUniqueKeyFromItem = item => {
  return item && (item.id || item.value || item.label)
}

export const getIndexMapFromItems = (items, path) => {
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
      // TODO: validate if this place is suppose to do something
      //indexMap
    }

    const key = getUniqueKeyFromItem(item)

    return { ...indexMap, [itemIndex]: key, ...childItems }
  }, {})
}

export const isDropRight = state => state.direction === 'right'

export const itemIsHover = (state, itemIndex) => {
  const { index } = state
  if (!index) return false

  return isPathActive(index, itemIndex)
}

export const itemIsOpen = (state, itemIndex) => {
  const { index } = state
  if (!index) return false

  return itemIsHover(state, itemIndex) && itemIndex.length < index.length
}

export const itemIsSelected = (state, itemIndex) => {
  return state.index === itemIndex
}

export const getItemProps = (state, item, index) => {
  if (!state) return item

  const { dropUp, id, enableTabNavigation, indexMap, selectedItem } = state
  const { className, value, ...rest } = item
  const dropRight = isDropRight(state)
  const indexKey = getUniqueKeyFromItem(item)

  let itemIndex

  if (indexMap) {
    itemIndex = Object.keys(indexMap).find(key => indexMap[key] === indexKey)
  }

  if (!isNil(index)) {
    itemIndex = !isString(index) ? index.toString() : index
  }

  const isActive = itemIsActive(selectedItem, item)
  const hasSubMenu = itemHasSubMenu(item)
  const isSelected = itemIsSelected(state, itemIndex)

  const itemId = pathResolve(id, itemIndex)

  const key =
    getComponentKey(item, index) ||
    indexKey ||
    `unsafeComponentKey-${item.toString()}`

  return {
    ...rest,
    className: classNames(
      'c-DropdownItem',

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
  if (Array.isArray(selectedItem) && selectedItem.length === 0) return true
  return false
}

export const getSelectedItemIndex = state => {
  const { selectedItem, indexMap } = state
  const selectedKey = getUniqueKeyFromItem(selectedItem)

  return Object.keys(indexMap).find(key => indexMap[key] === selectedKey)
}
