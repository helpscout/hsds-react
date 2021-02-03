import React, { useEffect } from 'react'
import { isObject } from '../../utilities/is'
import { Select } from './DropList.togglers'

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
