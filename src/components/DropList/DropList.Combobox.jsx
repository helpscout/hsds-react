import React, { useState, useRef, useEffect } from 'react'
import { useCombobox, useMultipleSelection } from 'downshift'
import { isObject } from '../../utilities/is'
import { noop } from '../../utilities/other'
import {
  itemToString,
  isItemADivider,
  isItemAGroupLabel,
  isItemSelected,
  findItemInArray,
  flattenGroups,
  removeItemFromArray,
} from './DropList.utils'
import {
  DividerUI,
  DropListWrapperUI,
  GroupLabelUI,
  InputSearchHolderUI,
  ListItemUI,
  MenuListUI,
  SelectedBadge,
} from './DropList.css'

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
    onInputValueChange({ inputValue }) {
      setInputItems(
        parsedItems.filter(item =>
          itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase())
        )
      )
    },

    onIsOpenChange(changes) {
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

    onStateChange(changes) {
      const { type, selectedItem } = changes

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (!withMultipleSelection) {
            onSelectionChange(Boolean(selectedItem) ? selectedItem : null)
            !Boolean(selectedItem) && selectItem(null)
          } else {
            if (selectedItem) {
              const { remove } = selectedItem

              if (!Boolean(remove)) {
                addSelectedItem(selectedItem)
                onSelectionChange(selectedItems.concat(selectedItem))
              } else {
                const itemToRemove = findItemInArray({
                  arr: selectedItems,
                  item: changes.selectedItem,
                })

                if (Boolean(itemToRemove)) {
                  removeSelectedItem(itemToRemove)
                  onSelectionChange(
                    removeItemFromArray({
                      arr: selectedItems,
                      item: itemToRemove,
                    })
                  )

                  selectedItems.length === 1 && selectItem(null)
                }
              }
            }
          }

          break

        default:
          break
      }
    },

    stateReducer(state, actionAndChanges) {
      const { type, changes } = actionAndChanges

      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          return {
            ...changes,
            highlightedIndex: 0,
          }

        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (withMultipleSelection) {
            const newState = {
              ...changes,
              isOpen: !closeOnSelection ? true : changes.isOpen,
              highlightedIndex: !closeOnSelection
                ? state.highlightedIndex
                : changes.highlightedIndex,
              inputValue: '',
            }

            if (
              Boolean(
                findItemInArray({
                  arr: selectedItems,
                  item: changes.selectedItem,
                })
              )
            ) {
              newState.selectedItem = isObject(changes.selectedItem)
                ? {
                    ...changes.selectedItem,
                    remove: true,
                  }
                : {
                    label: changes.selectedItem,
                    remove: true,
                  }
            }
            return newState
          } else {
            return { ...changes, inputValue: '' }
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
  /** ========== </EFFECTS> ============= */

  /** ========== <RENDERING> ============= */
  function renderListItem(item, index) {
    if (isItemADivider(item)) {
      return <DividerUI key={`divider_${index}`} />
    }

    if (isItemAGroupLabel(item)) {
      return (
        <GroupLabelUI key={`group_label_${index}`}>{item.label}</GroupLabelUI>
      )
    }

    const isSelected = isItemSelected({ item, selectedItem, selectedItems })
    let key
    let label

    if (isObject(item)) {
      key = item.id || `${label}_${index}`
      label = item.label
    } else {
      key = `${item}_${index}`
      label = item
    }

    return (
      <ListItemUI
        highlighted={highlightedIndex === index}
        selected={isSelected}
        withMultipleSelection={withMultipleSelection}
        key={key}
        {...getItemProps({ item, index })}
      >
        <span>{label}</span>
        {withMultipleSelection && isSelected ? <SelectedBadge /> : null}
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
  /** ========== </RENDERING> ============= */
}

export default Combobox
