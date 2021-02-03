import React, { useState, useRef, useEffect } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useCombobox, useMultipleSelection } from 'downshift'
import { isObject } from '../../utilities/is'
import { noop } from '../../utilities/other'
import { itemToString, isItemSelected } from './DropList.utils'
import {
  MenuListUI,
  ListItemUI,
  DropListWrapperUI,
  InputSearchHolderUI,
} from './DropList.css'

function Combobox({
  closeOnSelection,
  isDropdownOpen,
  onSelectionChange = noop,
  openDropdwon,
  withMultipleSelection,
  items,
}) {
  const [inputItems, setInputItems] = useState(items)
  const inputEl = useRef(null)

  /** ========== <DOWNSHIFT> ============= */
  const {
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection()
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
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter(item =>
          itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase())
        )
      )
    },
    onIsOpenChange: changes => {
      const { type } = changes

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          openDropdwon(!closeOnSelection)
          break

        case useCombobox.stateChangeTypes.InputKeyDownEscape:
          openDropdwon(false)
          break

        default:
          break
      }
    },

    onStateChange: changes => {
      const { type, selectedItem } = changes

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (selectedItem && withMultipleSelection) {
            if (selectedItems.length === 0) {
              addSelectedItem(selectedItem)
            } else {
              if (selectedItems.includes(selectedItem)) {
                removeSelectedItem(selectedItem)
              } else {
                addSelectedItem(selectedItem)
              }
            }
            selectItem(null)
          }

          break
        default:
          break
      }
    },

    stateReducer: (state, actionAndChanges) => {
      const { type, changes } = actionAndChanges

      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          return {
            ...changes,
            highlightedIndex: 0,
          }

        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            inputValue: '',
          }
        default:
          return changes
      }
    },
  })
  /** ========== </DOWNSHIFT> ============= */

  /** ========== <EFFECTS> ============= */
  useEffect(() => {
    isDropdownOpen && inputEl.current.focus()
  }, [isDropdownOpen])

  useDeepCompareEffect(() => {
    if (withMultipleSelection && selectedItems.length > 0) {
      onSelectionChange(selectedItems)
    } else {
      selectedItem != null && onSelectionChange(selectedItem)
    }
  }, [withMultipleSelection, selectedItems, selectedItem, onSelectionChange])
  /** ========== </EFFECTS> ============= */

  /** ========== <RENDER> ============= */
  function renderListItem(item, index) {
    if (isObject(item)) {
      const { id, label } = item
      const key = id || `${label}_${index}`

      return (
        <ListItemUI
          highlighted={highlightedIndex === index}
          selected={isItemSelected({ item, selectedItem, selectedItems })}
          key={key}
          {...getItemProps({ item, index })}
        >
          {item.label}
        </ListItemUI>
      )
    }
    return (
      <ListItemUI
        highlighted={highlightedIndex === index}
        selected={isItemSelected({ item, selectedItem, selectedItems })}
        key={`${item}_${index}`}
        {...getItemProps({ item, index })}
      >
        {item}
      </ListItemUI>
    )
  }

  return (
    <DropListWrapperUI {...getComboboxProps()}>
      <InputSearchHolderUI>
        <input
          {...getInputProps(getDropdownProps({ ref: inputEl }))}
          placeholder="Search"
        />
      </InputSearchHolderUI>
      <MenuListUI {...getMenuProps()}>
        {inputItems.length > 0 ? (
          inputItems.map(renderListItem)
        ) : (
          <ListItemUI>No results for {inputValue}</ListItemUI>
        )}
      </MenuListUI>
    </DropListWrapperUI>
  )
  /** ========== </RENDER> ============= */
}

export default Combobox
