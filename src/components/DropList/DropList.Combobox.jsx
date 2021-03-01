import React, { useState, useRef, useEffect } from 'react'
import { useCombobox } from 'downshift'
import { noop } from '../../utilities/other'
import {
  itemToString,
  isItemSelected,
  renderListContents,
} from './DropList.utils'
import {
  getA11ySelectionMessageCommon,
  onIsOpenChangeCommon,
  onStateChangeCommon,
  stateReducerCommon,
} from './DropList.downshift.common'
import {
  DropListWrapperUI,
  InputSearchHolderUI,
  MenuListUI,
} from './DropList.css'
import ListItem, { generateListItemKey } from './DropList.ListItem'

const VARIANT = 'Combobox'

function Combobox({
  closeOnSelection = true,
  customEmptyList = null,
  'data-cy': dataCy = `DropList.${VARIANT}`,
  initialSelectedItem,
  isOpen = false,
  items = [],
  onSelectionChange = noop,
  renderCustomListItem = null,
  toggleOpenedState = noop,
  withMultipleSelection = false,
}) {
  const initialSelectedItemsArr =
    withMultipleSelection && initialSelectedItem != null
      ? [].concat(initialSelectedItem)
      : []

  const [inputItems, setInputItems] = useState(items)
  const [selectedItems, setSelectedItems] = useState(initialSelectedItemsArr)
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
    initialInputValue: '',
    initialIsOpen: isOpen,
    initialSelectedItem,
    isOpen,
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
        items.filter(item =>
          itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase())
        )
      )
    },

    onIsOpenChange(changes) {
      const { type } = changes
      const typeAndVariant = `${VARIANT}.${type}`

      onIsOpenChangeCommon({
        changes,
        closeOnSelection,
        toggleOpenedState,
        type: typeAndVariant,
      })
    },

    onStateChange(changes) {
      const { type } = changes
      const typeAndVariant = `${VARIANT}.${type}`

      onStateChangeCommon({
        changes,
        onSelectionChange,
        selectItem,
        selectedItems,
        setSelectedItems,
        type: typeAndVariant,
        withMultipleSelection,
      })
    },

    stateReducer(state, actionAndChanges) {
      const { changes, type } = actionAndChanges
      const typeAndVariant = `${VARIANT}.${type}`

      return stateReducerCommon({
        changes,
        closeOnSelection,
        selectedItems,
        state,
        type: typeAndVariant,
        withMultipleSelection,
      })
    },
  })

  useEffect(() => {
    isOpen && inputEl.current.focus()
  }, [isOpen])

  function renderListItem(item, index) {
    const itemProps = {
      highlightedIndex,
      index,
      isSelected: isItemSelected({
        item,
        selectedItem,
        selectedItems,
      }),
      item,
      key: generateListItemKey(item, index),
      withMultipleSelection,
      renderCustomListItem,
      ...getItemProps({ item, index }),
    }

    return <ListItem {...itemProps} />
  }

  return (
    <DropListWrapperUI
      className="DropList DropList__Combobox"
      data-cy={dataCy}
      variant="combobox"
      {...getComboboxProps()}
    >
      <InputSearchHolderUI show={items.length > 0}>
        <input {...getInputProps({ ref: inputEl })} placeholder="Search" />
      </InputSearchHolderUI>
      <MenuListUI className="MenuList MenuList-Combobox" {...getMenuProps()}>
        {renderListContents({
          customEmptyList,
          emptyList: items.length === 0,
          inputValue,
          items: inputItems,
          renderListItem,
        })}
      </MenuListUI>
    </DropListWrapperUI>
  )
}

export default Combobox
