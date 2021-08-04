import React, { useState, useRef, useEffect } from 'react'
import { useCombobox } from 'downshift'
import useDeepCompareEffect from 'use-deep-compare-effect'
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
import {
  DropListWrapperUI,
  InputSearchHolderUI,
  MenuListUI,
} from './DropList.css'
import ListItem, { generateListItemKey } from './DropList.ListItem'
import { DROPLIST_MENULIST, VARIANTS } from './DropList.constants'

function Combobox({
  clearOnSelect = false,
  closeOnBlur = true,
  closeOnSelection = true,
  customEmptyList = null,
  'data-cy': dataCy = `DropList.${VARIANTS.COMBOBOX}`,
  selectedItem = null,
  selectedItems,
  isOpen = false,
  items = [],
  menuCSS,
  onMenuBlur = noop,
  onMenuFocus = noop,
  onListItemSelectEvent = noop,
  handleSelectedItemChange = noop,
  renderCustomListItem = null,
  toggleOpenedState = noop,
  withMultipleSelection = false,
}) {
  const [inputItems, setInputItems] = useState(items)
  const inputEl = useRef(null)

  const {
    getComboboxProps,
    getInputProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    inputValue,
  } = useCombobox({
    initialInputValue: '',
    initialIsOpen: isOpen,
    isOpen,
    items: inputItems,
    itemToString,
    selectedItem,

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
      onIsOpenChangeCommon({
        closeOnBlur,
        closeOnSelection,
        toggleOpenedState,
        type: `${VARIANTS.COMBOBOX}.${changes.type}`,
      })
    },

    onSelectedItemChange: handleSelectedItemChange,

    onStateChange({ type }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
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
        type: `${VARIANTS.COMBOBOX}.${type}`,
        withMultipleSelection,
      })
    },
  })

  useEffect(() => {
    isOpen && inputEl.current.focus()
  }, [isOpen])

  useDeepCompareEffect(() => {
    setInputItems(items)
  }, [items])

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

  return (
    <DropListWrapperUI
      className="DropList DropList__Combobox"
      data-cy={dataCy}
      variant="combobox"
      menuCSS={menuCSS}
      {...getComboboxProps()}
    >
      <InputSearchHolderUI show={items.length > 0}>
        <input
          data-event-driver
          {...getInputProps({
            className: 'DropList__Combobox__input',
            ref: inputEl,
            onBlur: e => {
              onMenuBlur(e)
            },
            onFocus: event => {
              onMenuFocus(event)
            },
            onKeyDown: event => {
              if (event.key === 'Tab') {
                event.preventDefault()
                toggleOpenedState(false)
              }
              if (event.key === 'Enter') {
                const droplistMenu =
                  event.target.parentElement.nextElementSibling

                // Since the event happens on the input and not the list item
                // we look for the selected item and send it to onListItemSelectEvent as listItemNode
                droplistMenu.querySelectorAll('.DropListItem').forEach(item => {
                  if (item.classList.contains('is-highlighted')) {
                    event.persist()
                    onListItemSelectEvent({ listItemNode: item, event })
                  }
                })
              }
            },
          })}
          placeholder="Search"
        />
      </InputSearchHolderUI>
      <MenuListUI
        className={`${DROPLIST_MENULIST} MenuList-Combobox`}
        {...getMenuProps()}
      >
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
