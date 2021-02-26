import React, { useState } from 'react'
import { useSelect } from 'downshift'
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
import { A11yTogglerUI, DropListWrapperUI, MenuListUI } from './DropList.css'
import ListItem, { generateListItemKey } from './DropList.ListItem'

function Select({
  closeOnSelection = true,
  'data-cy': dataCy = 'DropList.Select',
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
      const { type } = changes
      console.log(
        type === '__menu_keydown_arrow_down__'
          ? '__menu_keydown_arrow_down__'
          : ''
      )
      console.log(
        type === '__menu_keydown_arrow_up__' ? '__menu_keydown_arrow_up__' : ''
      )
      console.log(
        type === '__menu_keydown_escape__' ? '__menu_keydown_escape__' : ''
      )
      console.log(
        type === '__menu_keydown_home__' ? '__menu_keydown_home__' : ''
      )
      console.log(type === '__menu_keydown_end__' ? '__menu_keydown_end__' : '')
      console.log(
        type === '__menu_keydown_enter__' ? '__menu_keydown_enter__' : ''
      )
      console.log(
        type === '__menu_keydown_space_button__'
          ? '__menu_keydown_space_button__'
          : ''
      )
      console.log(
        type === '__menu_keydown_character__'
          ? '__menu_keydown_character__'
          : ''
      )
      console.log(type === '__menu_blur__' ? '__menu_blur__' : '')
      console.log(type === '__menu_mouse_leave__' ? '__menu_mouse_leave__' : '')
      console.log(type === '__item_mouse_move__' ? '__item_mouse_move__' : '')
      console.log(type === '__item_click__' ? '__item_click__' : '')
      console.log(
        type === '__togglebutton_keydown_character__'
          ? '__togglebutton_keydown_character__'
          : ''
      )
      console.log(
        type === '__togglebutton_keydown_arrow_down__'
          ? '__togglebutton_keydown_arrow_down__'
          : ''
      )
      console.log(
        type === '__togglebutton_keydown_arrow_up__'
          ? '__togglebutton_keydown_arrow_up__'
          : ''
      )
      console.log(
        type === '__togglebutton_click__' ? '__togglebutton_click__' : ''
      )
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
      renderCustomListItem,
      ...getItemProps({ item, index }),
    }

    return <ListItem {...itemProps} />
  }

  return (
    <DropListWrapperUI className="DropList DropList__Select" data-cy={dataCy}>
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
