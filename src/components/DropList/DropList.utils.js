import React, { useEffect } from 'react'
import { isDefined, isObject } from '../../utilities/is'
import { SelectTag } from './DropList.togglers'
import { ListItemUI, EmptyListUI } from './DropList.css'

const ITEM_TYPES = {
  DIVIDER: 'divider',
  GROUP: 'group',
  GROUP_LABEL: 'group_label',
}

export function displayWarnings({ toggler, withMultipleSelection }) {
  if (process.env.NODE_ENV !== 'production') {
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
  }
}

export function useWarnings({ toggler, withMultipleSelection }) {
  useEffect(() => {
    displayWarnings({ toggler, withMultipleSelection })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export function isTogglerOfType(toggler, type) {
  return React.isValidElement(toggler) && toggler.type === type
}

export function itemToString(item) {
  if (item == null) return ''
  if (isObject(item)) return item.label || ''
  return item
}

export function isItemSelected({ item, selectedItem, selectedItems }) {
  if (selectedItem == null && selectedItems.length === 0) return false

  if (isObject(item)) {
    const { label } = item

    if (selectedItem != null && selectedItems.length === 0) {
      const { label: selectedItemLabel } = selectedItem

      return selectedItemLabel === label
    }

    return Boolean(selectedItems.find(item => item.label === label))
  }

  return selectedItem === item || selectedItems.includes(item)
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

export function flattenListItems(listItems) {
  return listItems.reduce((accumulator, listItem) => {
    if (isItemAGroup(listItem)) {
      const itemsInGroup = listItem.items.map(item => ({
        ...item,
        group: listItem.label,
      }))

      return itemsInGroup.length > 0
        ? accumulator
            .concat({ type: ITEM_TYPES.GROUP_LABEL, label: listItem.label })
            .concat(itemsInGroup)
        : accumulator
    }

    return accumulator.concat(listItem)
  }, [])
}

export function renderListContents({
  customEmptyList,
  emptyList,
  inputValue,
  items,
  renderListItem,
}) {
  if (emptyList && !customEmptyList) return <EmptyListUI>No items</EmptyListUI>

  if (emptyList && customEmptyList) {
    return React.isValidElement(customEmptyList) ? (
      React.cloneElement(customEmptyList)
    ) : (
      <EmptyListUI>No items</EmptyListUI>
    )
  }

  if (items.length > 0) {
    return items.map(renderListItem)
  }

  return <ListItemUI>No results for {inputValue}</ListItemUI>
}
