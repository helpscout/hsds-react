import React, { useEffect } from 'react'
import { isDefined, isObject, isString } from '../../utilities/is'
import { ITEM_TYPES, VARIANTS } from './DropList.constants'
import { SelectTag } from './DropList.togglers'
import { ListItemUI, EmptyListUI } from './DropList.css'
import Combobox from './DropList.Combobox'
import Select from './DropList.Select'

export function getDropListVariant({
  variant,
  autoSetComboboxAt,
  numberOfItems,
}) {
  return variant.toLowerCase() === VARIANTS.COMBOBOX ||
    (autoSetComboboxAt > 0 && numberOfItems >= autoSetComboboxAt)
    ? Combobox
    : Select
}

// No need to test this helper
/* istanbul ignore next */
export function displayWarnings({
  toggler,
  withMultipleSelection,
  menuCSS,
  tippyOptions,
}) {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    if (!React.isValidElement(toggler)) {
      console.info(
        'Pass one of the provided togglers or a custom one to the `toggler` prop'
      )
    }
    if (isTogglerOfType(toggler, SelectTag) && withMultipleSelection) {
      console.info(
        'The Select toggler option should not have withMultipleSelection enabled, it has been disabled for you'
      )
    }
    if (menuCSS != null && tippyOptions.appendTo === undefined) {
      console.error(
        'menuCSS is only needed when using tippyOptions.appendTo to portal the DropList, please use regular styled components if you need custom styles'
      )
    }
  }
}

export function useWarnings(props) {
  useEffect(() => {
    displayWarnings(props)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export function isTogglerOfType(toggler, type) {
  return React.isValidElement(toggler) && toggler.type === type
}

export function itemToString(item) {
  if (item == null || checkIfGroupOrDividerItem(item)) return ''
  // Items can be simple strings
  if (isString(item)) return item

  if (isObject(item)) {
    // Object items should have 'label' or 'value', obtain which one is used per item
    const itemContentKeyName = getItemContentKeyName(item)

    return itemContentKeyName ? item[itemContentKeyName] : ''
  }

  return ''
}

export function parseSelectionFromProps({ withMultipleSelection, selection }) {
  if (withMultipleSelection) {
    return selection != null ? [].concat(selection) : []
  }
  if (selection != null) {
    return selection != null ? selection : null
  }
}

export function isItemSelected({ item, selectedItem, selectedItems }) {
  if (selectedItem == null && selectedItems.length === 0) return false

  if (isObject(item)) {
    const itemContentKey = getItemContentKeyName(item)
    const itemContent = item[itemContentKey]

    if (selectedItem != null && selectedItems.length === 0) {
      const selectedItemContentKey = getItemContentKeyName(selectedItem)
      const selectedItemContent = selectedItem[selectedItemContentKey]

      return selectedItemContent === itemContent
    }

    return Boolean(
      selectedItems.find(item => item[itemContentKey] === itemContent)
    )
  }

  return selectedItem === item || selectedItems.includes(item)
}

export function getItemContentKeyName(item) {
  if (objectHasKey(item, 'label')) return 'label'
  if (objectHasKey(item, 'value')) return 'value'

  return undefined
}

export function objectHasKey(obj, key) {
  return isObject(obj) && isDefined(obj[key])
}

export function findItemInArray({ item, arr, key = 'label' }) {
  if (item == null) return undefined

  return arr.find(i => {
    if (isObject(i)) {
      return i[key] === item[key]
    }
    if (isObject(item)) {
      return i === item[key]
    }
    return i === item
  })
}

export function removeItemFromArray({ item, arr, key = 'label' }) {
  return arr.filter(i => {
    if (isObject(i)) {
      return i[key] !== item[key]
    }
    if (isObject(item)) {
      return i !== item[key]
    }
    return i !== item
  })
}

export function isItemADivider(item) {
  return objectHasKey(item, 'type') && item.type === ITEM_TYPES.DIVIDER
}

export function isItemAGroup(item) {
  return objectHasKey(item, 'type') && item.type === ITEM_TYPES.GROUP
}

export function isItemAGroupLabel(item) {
  return objectHasKey(item, 'type') && item.type === ITEM_TYPES.GROUP_LABEL
}

export function isItemInert(item) {
  return objectHasKey(item, 'type') && item.type === ITEM_TYPES.INERT
}

export function isItemAction(item) {
  return objectHasKey(item, 'type') && item.type === ITEM_TYPES.ACTION
}

export function isItemRegular(item) {
  return (
    !isItemADivider(item) && !isItemAGroup(item) && !isItemAGroupLabel(item)
  )
}

export function flattenListItems(listItems) {
  return listItems.reduce((accumulator, listItem) => {
    const contentKey = getItemContentKeyName(listItem)

    if (isItemAGroup(listItem)) {
      const itemsInGroup = listItem.items.map(item => ({
        ...item,
        group: listItem[contentKey],
      }))

      return itemsInGroup.length > 0
        ? accumulator
            .concat({
              type: ITEM_TYPES.GROUP_LABEL,
              [contentKey]: listItem[contentKey],
            })
            .concat(itemsInGroup)
        : accumulator
    }

    return accumulator.concat(listItem)
  }, [])
}

export function renderListContents({
  customEmptyList,
  inputValue,
  items,
  renderListItem,
}) {
  const isEmptyList = items.length === 0

  if (!isEmptyList) {
    return items.map(renderListItem)
  }

  if (isEmptyList && customEmptyList) {
    return React.isValidElement(customEmptyList) ? (
      React.cloneElement(customEmptyList)
    ) : (
      <EmptyListUI>No items</EmptyListUI>
    )
  }

  if (isEmptyList && !customEmptyList && inputValue == null) {
    return <EmptyListUI>No items</EmptyListUI>
  }

  return <ListItemUI>No results for {inputValue}</ListItemUI>
}

// No need to test this helper
/* istanbul ignore next */
export function requiredItemPropsCheck(props, propName, componentName) {
  if (!props.label && !props.value) {
    return new Error(
      `One of 'label' or 'value' is required by '${componentName}' component.`
    )
  }
}

export function checkIfGroupOrDividerItem(item) {
  return isItemADivider(item) || isItemAGroup(item) || isItemAGroupLabel(item)
}

export function isItemHighlightable(item) {
  return (
    !checkIfGroupOrDividerItem(item) && !item.isDisabled && !isItemInert(item)
  )
}

export function getEnabledItemIndex({
  currentHighlightedIndex,
  nextHighlightedIndex,
  items,
  arrowKey,
}) {
  // When nextHighlightedIndex === -1 it means there are no items to be highlighted
  // like in the case of a combobox being filtered to "no results"
  if (nextHighlightedIndex === -1) return -1

  const isNextIndexItemHighlightable = isItemHighlightable(
    items[nextHighlightedIndex]
  )

  if (
    isNextIndexItemHighlightable &&
    currentHighlightedIndex !== nextHighlightedIndex
  ) {
    return nextHighlightedIndex
  }

  const highlightableItems = items.filter(item => {
    return (
      !checkIfGroupOrDividerItem(item) && !item.isDisabled && !isItemInert(item)
    )
  })

  if (highlightableItems.length === 1) {
    return items.findIndex(isItemHighlightable)
  }

  let newNextHighlightedIndex
  const firstIndex = 0
  const lastIndex = items.length - 1

  if (arrowKey === 'UP') {
    const isNextIndexAfterFirst = nextHighlightedIndex - 1 >= firstIndex

    newNextHighlightedIndex = isNextIndexAfterFirst
      ? nextHighlightedIndex - 1
      : lastIndex
  } else {
    const isNextIndexBeforeLast = nextHighlightedIndex + 1 <= lastIndex

    newNextHighlightedIndex = isNextIndexBeforeLast
      ? nextHighlightedIndex + 1
      : firstIndex
  }

  return getEnabledItemIndex({
    currentHighlightedIndex,
    nextHighlightedIndex: newNextHighlightedIndex,
    items,
    arrowKey,
  })
}

export function getMenuWidth(variant, menuWidth) {
  if (menuWidth != null) return menuWidth

  return variant.toLowerCase() === 'combobox' ? '220px' : '200px'
}
