import React, { useState } from 'react'
import { useSelect } from 'downshift'
import { noop } from '../../utilities/other'
import { isFunction } from '../../utilities/is'
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
import { A11yTogglerUI, DropListWrapperUI, MenuListUI } from './DropList.css'
import ListItem, { generateListItemKey } from './DropList.ListItem'

function Select({
  closeOnSelection = true,
  initialSelectedItem,
  customEmptyList = null,
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
  const [selectedItems, setSelectedItems] = useState(initialSelectedItemsArr)

  const {
    getToggleButtonProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    selectItem,
    selectedItem,
  } = useSelect({
    initialIsOpen: isOpen,
    isOpen,
    items,
    itemToString,

    getA11ySelectionMessage: ({ selectedItem }) => {
      return getA11ySelectionMessageCommon({
        selectedItem,
        selectedItems,
        withMultipleSelection,
      })
    },

    onIsOpenChange(changes) {
      onIsOpenChangeCommon({
        changes,
        closeOnSelection,
        toggleOpenedState,
      })
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
    }

    if (renderCustomListItem != null && isFunction(renderCustomListItem)) {
      return renderCustomListItem({ ...itemProps, getItemProps })
    }

    return <ListItem {...itemProps} {...getItemProps({ item, index })} />
  }

  return (
    <DropListWrapperUI>
      <A11yTogglerUI {...getToggleButtonProps()}>Toggler</A11yTogglerUI>
      <MenuListUI {...getMenuProps()}>
        {renderListContents({
          customEmptyList,
          emptyList: items.length === 0,
          items,
          renderListItem,
        })}
      </MenuListUI>
    </DropListWrapperUI>
  )
}

export default Select
