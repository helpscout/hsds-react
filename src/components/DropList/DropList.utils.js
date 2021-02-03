import React, { useEffect } from 'react'
import { isDefined, isObject } from '../../utilities/is'
import { Select } from './DropList.togglers'

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
    if (isSelectTypeToggler(toggler) && withMultipleSelection) {
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

export function isSelectTypeToggler(toggler) {
  return React.isValidElement(toggler) && toggler.type === Select
}

export function itemToString(item) {
  if (item == null) return ''
  if (isObject(item)) return item.label || ''
  return item
}

export function isItemSelected({ item, selectedItem, selectedItems }) {
  if (selectedItem == null) return false

  if (isObject(item)) {
    const { label } = item
    const { label: selectedItemLabel } = selectedItem
    return (
      selectedItemLabel === label ||
      selectedItems.find(selected => selected.label === label)
    )
  }

  return selectedItem === item || selectedItems.includes(item)
}

export function objectHasField(obj, field) {
  return isObject(obj) && isDefined(obj[field])
}

export function isItemADivider(item) {
  return objectHasField(item, 'type') && item.type === ITEM_TYPES.DIVIDER
}

export function isItemAGroupLabel(item) {
  return objectHasField(item, 'type') && item.type === ITEM_TYPES.GROUP_LABEL
}

export function areItemsGrouped(items) {
  if (!Array.isArray(items) || items.length === 0) return false

  return isDefined(items.find(item => item.type === ITEM_TYPES.GROUP))
}

export function flattenGroups(items) {
  if (areItemsGrouped(items)) {
    return items.reduce((accumulator, group) => {
      const itemsInGroup = group.items.map(item => ({
        ...item,
        group: group.label,
      }))

      return itemsInGroup.length > 0
        ? accumulator
            .concat({ type: ITEM_TYPES.GROUP_LABEL, label: group.label })
            .concat(itemsInGroup)
        : accumulator
    }, [])
  }

  return items
}
