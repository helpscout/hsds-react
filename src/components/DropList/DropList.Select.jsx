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
import { DROPLIST_MENULIST, VARIANTS } from './DropList.constants'

function Select({
  clearOnSelect = false,
  closeOnBlur = true,
  closeOnSelection = true,
  customEmptyList = null,
  'data-cy': dataCy = `DropList.${VARIANTS.SELECT}`,
  enableLeftRightNavigation = false,
  handleSelectedItemChange = noop,
  isOpen = false,
  items = [],
  menuCSS,
  onMenuBlur = noop,
  onMenuFocus = noop,
  onListItemSelectEvent = noop,
  renderCustomListItem = null,
  selectedItem = null,
  selectedItems,
  toggleOpenedState = noop,
  withMultipleSelection = false,
}) {
  const {
    highlightedIndex,
    getItemProps,
    getMenuProps,
    getToggleButtonProps,
    setHighlightedIndex,
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
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.ItemClick:
          clearOnSelect && handleSelectedItemChange({ selectedItem: null })
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
        items,
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
        if (highlightedIndex !== items.length - 1) {
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

    if (event.key === 'Enter' || event.key === ' ') {
      // Since the event happens on the Menu and not the list item
      // we look for the selected item and send it to onListItemSelectEvent as listItemNode
      event.target.querySelectorAll('.DropListItem').forEach(item => {
        if (item.classList.contains('is-highlighted')) {
          event.persist()
          onListItemSelectEvent({ listItemNode: item, event })
        }
      })
    }
  }

  return (
    <DropListWrapperUI
      className="DropList DropList__Select"
      data-cy={dataCy}
      menuCSS={menuCSS}
    >
      <A11yTogglerUI {...getToggleButtonProps()}>Toggler</A11yTogglerUI>
      <MenuListUI
        data-event-driver
        className={`${DROPLIST_MENULIST} MenuList-Select`}
        {...getMenuProps({
          onKeyDown: handleMenuKeyDown,
          onFocus: e => {
            onMenuFocus(e)
          },
          onBlur: e => {
            if (closeOnBlur) {
              /**
               * Closing on blur
               *
               * When clicking on the toggler, this event gets fired _before_
               * so it sets the isOpen flag to false, and then the click event happens
               * and sets isOpen to true, making the DropList never close on cliking
               * the toggler.
               *
               * Here we wait a little bit to see if the next element gathering focus
               * is indeed the toggler, and only close the DropList if it isn't
               */
              setTimeout(() => {
                if (
                  !document.activeElement.classList.contains('DropListToggler')
                ) {
                  toggleOpenedState(false)
                }
              }, 50)
            }
            onMenuBlur(e)
          },
        })}
      >
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
