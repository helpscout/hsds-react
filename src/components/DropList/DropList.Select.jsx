import React, { useEffect } from 'react'
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
import { DROPLIST_MENULIST, VARIANTS } from './DropList.constants'

function Select({
  index,
  clearOnSelect = false,
  closeOnSelection = true,
  customEmptyList = null,
  customEmptyListItems,
  'data-cy': dataCy = `DropList.${VARIANTS.SELECT}`,
  enableLeftRightNavigation = false,
  handleSelectedItemChange = noop,
  isOpen = false,
  items = [],
  menuAriaLabel,
  menuCSS,
  menuWidth,
  focusToggler = noop,
  onDropListLeave = noop,
  onMenuBlur = noop,
  onMenuFocus = noop,
  onListItemSelectEvent = noop,
  renderCustomListItem = null,
  selectedItem = null,
  selectedItems,
  toggleOpenedState = noop,
  withMultipleSelection = false,
}) {
  const isListEmpty = items.length === 0
  const allItems =
    isListEmpty && Array.isArray(customEmptyListItems)
      ? customEmptyListItems
      : items
  const {
    highlightedIndex,
    getItemProps,
    getMenuProps,
    getToggleButtonProps,
    setHighlightedIndex,
  } = useSelect({
    initialIsOpen: isOpen,
    isOpen,
    items: allItems,
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
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.ItemClick:
          clearOnSelect && handleSelectedItemChange({ selectedItem: null })
          closeOnSelection && focusToggler()
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
        items: allItems,
        selectedItems,
        state,
        type: `${VARIANTS.SELECT}.${type}`,
        withMultipleSelection,
      })
    },
  })

  useEffect(() => {
    setHighlightedIndex(index)
  }, [index])

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
      isDisabled: item.isDisabled,
      ...getItemProps({
        item,
        index,
        onClick: event => {
          event.persist()
          onListItemSelectEvent({ listItemNode: event.target, event })

          if (item.isDisabled) {
            event.nativeEvent.preventDownshiftDefault = true
            return
          }
        },
      }),
    }

    return <ListItem {...itemProps} />
  }

  function handleMenuKeyDown(event) {
    if (enableLeftRightNavigation) {
      if (event.key === 'ArrowRight') {
        if (highlightedIndex !== allItems.length - 1) {
          setHighlightedIndex(highlightedIndex + 1)
        }
      } else if (event.key === 'ArrowLeft') {
        if (highlightedIndex <= 0) {
          setHighlightedIndex(0)
        } else {
          setHighlightedIndex(highlightedIndex - 1)
        }
      }
    }
    if (event.key === 'Escape') {
      focusToggler()
    } else if (event.key === 'Enter' || event.key === ' ') {
      // Since the event happens on the Menu and not the list item
      // we look for the selected item and send it to onListItemSelectEvent as listItemNode
      event.target.querySelectorAll('.DropListItem').forEach(item => {
        if (item.classList.contains('is-highlighted')) {
          event.persist()
          onListItemSelectEvent({ listItemNode: item, event })
        }
      })
    } else if (event.key === 'Tab') {
      isOpen && toggleOpenedState(false)
      onDropListLeave()
    }
  }

  return (
    <DropListWrapperUI
      className="DropList DropList__Select"
      data-cy={dataCy}
      menuCSS={menuCSS}
      menuWidth={menuWidth}
    >
      <A11yTogglerUI {...getToggleButtonProps()} aria-labelledby={null}>
        Toggler
      </A11yTogglerUI>
      <MenuListUI
        data-event-driver
        className={`${DROPLIST_MENULIST} MenuList-Select`}
        {...getMenuProps({
          onKeyDown: handleMenuKeyDown,
          onFocus: e => {
            onMenuFocus(e)
          },
          onBlur: e => {
            onMenuBlur(e)
          },
        })}
        aria-label={menuAriaLabel}
        aria-labelledby={null}
      >
        {renderListContents({
          customEmptyList,
          items: allItems,
          renderListItem,
        })}
      </MenuListUI>
    </DropListWrapperUI>
  )
}

export default Select
