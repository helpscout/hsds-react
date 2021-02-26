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
      if (type === useSelect.stateChangeTypes.MenuKeyDownArrowDown) {
        console.log('__menu_keydown_arrow_down__')
      }

      if (type === useSelect.stateChangeTypes.MenuKeyDownArrowUp) {
        console.log('__menu_keydown_arrow_up__')
      }

      if (type === useSelect.stateChangeTypes.MenuKeyDownEscape) {
        console.log('__menu_keydown_escape__')
      }

      if (type === useSelect.stateChangeTypes.MenuKeyDownHome) {
        console.log('__menu_keydown_home__')
      }
      if (type === useSelect.stateChangeTypes.MenuKeyDownEnd) {
        console.log('__menu_keydown_end__')
      }

      if (type === useSelect.stateChangeTypes.MenuKeyDownEnter) {
        console.log('__menu_keydown_enter__')
      }
      if (type === useSelect.stateChangeTypes.MenuKeyDownSpaceButton) {
        console.log('__menu_keydown_space_button__')
      }
      if (type === useSelect.stateChangeTypes.MenuKeyDownCharacter) {
        console.log('__menu_keydown_character__')
      }
      if (type === useSelect.stateChangeTypes.MenuBlur) {
        console.log('__menu_blur__')
      }
      if (type === useSelect.stateChangeTypes.MenuMouseLeave) {
        console.log('__menu_mouse_leave__')
      }

      if (type === useSelect.stateChangeTypes.ItemMouseMove) {
        console.log('__item_mouse_move__')
      }

      if (type === useSelect.stateChangeTypes.ItemClick) {
        console.log('__item_click__')
      }
      if (type === useSelect.stateChangeTypes.ToggleButtonKeyDownCharacter) {
        console.log('__togglebutton_keydown_character__')
      }
      if (type === useSelect.stateChangeTypes.ToggleButtonKeyDownArrowDown) {
        console.log('__togglebutton_keydown_arrow_down__')
      }

      if (type === useSelect.stateChangeTypes.ToggleButtonKeyDownArrowUp) {
        console.log('__togglebutton_keydown_arrow_up__')
      }

      if (type === useSelect.stateChangeTypes.ToggleButtonClick) {
        console.log('__togglebutton_click__')
      }

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
