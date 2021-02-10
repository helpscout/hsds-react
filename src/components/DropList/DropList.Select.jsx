import React, { useState } from 'react'
import { useSelect } from 'downshift'
import { noop } from '../../utilities/other'
import { itemToString, isItemSelected, flattenGroups } from './DropList.utils'
import {
  getA11ySelectionMessageCommon,
  onIsOpenChangeCommon,
  onStateChangeCommon,
  stateReducerCommon,
} from './DropList.downshift.common'
import { A11yTogglerUI, DropListWrapperUI, MenuListUI } from './DropList.css'
import ListItem, { generateListItemKey } from './DropList.ListItem'

function Select({
  closeOnSelection,
  isDropdownOpen,
  onSelectionChange = noop,
  openDropdwon,
  withMultipleSelection,
  items,
}) {
  const parsedItems = flattenGroups(items)
  const [selectedItems, setSelectedItems] = useState([])

  const {
    getToggleButtonProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    selectItem,
    selectedItem,
  } = useSelect({
    initialIsOpen: isDropdownOpen,
    isOpen: isDropdownOpen,
    items: parsedItems,
    itemToString,

    getA11ySelectionMessage: ({ selectedItem }) => {
      return getA11ySelectionMessageCommon({
        selectedItem,
        selectedItems,
        withMultipleSelection,
      })
    },

    onIsOpenChange(changes) {
      onIsOpenChangeCommon({ changes, closeOnSelection, openDropdwon })
    },

    onStateChange(changes) {
      onStateChangeCommon(
        changes,
        withMultipleSelection,
        onSelectionChange,
        selectItem,
        selectedItems,
        setSelectedItems
      )
    },

    stateReducer(state, actionAndChanges) {
      return stateReducerCommon({
        state,
        actionAndChanges,
        withMultipleSelection,
        closeOnSelection,
        selectedItems,
      })
    },
  })

  return (
    <DropListWrapperUI>
      <A11yTogglerUI {...getToggleButtonProps()}>Toggler</A11yTogglerUI>
      <MenuListUI {...getMenuProps()}>
        {parsedItems.map((item, index) => {
          return (
            <ListItem
              highlightedIndex={highlightedIndex}
              index={index}
              isSelected={isItemSelected({
                item,
                selectedItem,
                selectedItems,
              })}
              item={item}
              key={generateListItemKey(item, index)}
              withMultipleSelection={withMultipleSelection}
              {...getItemProps({ item, index })}
            />
          )
        })}
      </MenuListUI>
    </DropListWrapperUI>
  )
}

export default Select
