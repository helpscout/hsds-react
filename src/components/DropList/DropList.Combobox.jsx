import React, { useState, useRef, useEffect } from 'react'
import { useCombobox } from 'downshift'
import { noop } from '../../utilities/other'
import { itemToString, isItemSelected, flattenGroups } from './DropList.utils'
import {
  getA11ySelectionMessageCommon,
  onIsOpenChangeCommon,
  onStateChangeCommon,
  stateReducerCommon,
} from './DropList.downshift.common'
import {
  DropListWrapperUI,
  InputSearchHolderUI,
  ListItemUI,
  MenuListUI,
} from './DropList.css'
import ListItem, { generateListItemKey } from './DropList.ListItem'

function Combobox({
  closeOnSelection,
  isDropdownOpen,
  onSelectionChange = noop,
  openDropdwon,
  withMultipleSelection,
  items,
}) {
  const parsedItems = flattenGroups(items)
  const [inputItems, setInputItems] = useState(parsedItems)
  const [selectedItems, setSelectedItems] = useState([])
  const inputEl = useRef(null)

  const {
    getComboboxProps,
    getInputProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    inputValue,
    selectItem,
    selectedItem,
  } = useCombobox({
    initialIsOpen: isDropdownOpen,
    isOpen: isDropdownOpen,
    items: inputItems,
    itemToString,

    getA11ySelectionMessage: ({ selectedItem }) => {
      return getA11ySelectionMessageCommon({
        selectedItem,
        selectedItems,
        withMultipleSelection,
      })
    },

    onInputValueChange({ inputValue }) {
      setInputItems(
        parsedItems.filter(item =>
          itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase())
        )
      )
    },

    onIsOpenChange(changes) {
      onIsOpenChangeCommon({ changes, closeOnSelection, openDropdwon })
    },

    onStateChange(changes) {
      onStateChangeCommon({
        changes,
        withMultipleSelection,
        onSelectionChange,
        selectItem,
        selectedItems,
        setSelectedItems,
      })
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

  useEffect(() => {
    isDropdownOpen && inputEl.current.focus()
  }, [isDropdownOpen])

  return (
    <DropListWrapperUI {...getComboboxProps()}>
      <InputSearchHolderUI>
        <input {...getInputProps({ ref: inputEl })} placeholder="Search" />
      </InputSearchHolderUI>
      <MenuListUI {...getMenuProps()}>
        {inputItems.length > 0 ? (
          inputItems.map((item, index) => {
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
          })
        ) : (
          <ListItemUI>No results for {inputValue}</ListItemUI>
        )}
      </MenuListUI>
    </DropListWrapperUI>
  )
}

export default Combobox
