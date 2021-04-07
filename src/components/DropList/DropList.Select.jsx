import React from 'react'
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
  stateReducerCommon,
} from './DropList.downshift.common'
import { A11yTogglerUI, DropListWrapperUI, MenuListUI } from './DropList.css'
import ListItem, { generateListItemKey } from './DropList.ListItem'
import { VARIANTS } from './DropList.constants'

function Select({
  closeOnSelection = true,
  'data-cy': dataCy = `DropList.${VARIANTS.SELECT}`,
  selectedItem = null,
  selectedItems,
  customEmptyList = null,
  isOpen = false,
  items = [],
  onMenuBlur = noop,
  handleSelectedItemChange = noop,
  renderCustomListItem = null,
  toggleOpenedState = noop,
  withMultipleSelection = false,
}) {
  const {
    getToggleButtonProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
  } = useSelect({
    initialIsOpen: isOpen,
    isOpen,
    items,
    itemToString,
    selectedItem,

    getA11ySelectionMessage: ({ selectedItem }) => {
      return getA11ySelectionMessageCommon({
        selectedItem,
        selectedItems,
        withMultipleSelection,
      })
    },

    onIsOpenChange(changes) {
      onIsOpenChangeCommon({
        closeOnSelection,
        toggleOpenedState,
        type: `${VARIANTS.SELECT}.${changes.type}`,
      })
    },

    onSelectedItemChange: handleSelectedItemChange,

    onStateChange({ type }) {
      switch (type) {
        case useSelect.stateChangeTypes.MenuBlur:
          onMenuBlur()
          break

        default:
          break
      }
    },

    stateReducer(state, actionAndChanges) {
      const { changes, type } = actionAndChanges

      return stateReducerCommon({
        changes,
        closeOnSelection,
        selectedItems,
        state,
        type: `${VARIANTS.SELECT}.${type}`,
        withMultipleSelection,
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
