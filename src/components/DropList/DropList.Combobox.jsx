import React, { useState, useRef, useEffect } from 'react'
import { useCombobox } from 'downshift'
import useDeepCompareEffect from 'use-deep-compare-effect'
import isFunction from 'lodash.isfunction'
import {
  itemToString,
  isItemSelected,
  renderListContents,
  isItemHighlightable,
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

function noop() {}

function Combobox({
  clearOnSelect = false,
  closeOnSelection = true,
  customEmptyList = null,
  customEmptyListItems,
  'data-cy': dataCy = `DropList.${VARIANTS.COMBOBOX}`,
  focusToggler = noop,
  handleSelectedItemChange = noop,
  inputPlaceholder = 'Search',
  items = [],
  isOpen = false,
  menuAriaLabel,
  menuCSS,
  menuWidth,
  onDropListLeave = noop,
  onMenuBlur = noop,
  onMenuFocus = noop,
  onListItemSelectEvent = noop,
  onInputChange = noop,
  renderCustomListItem = null,
  selectedItem = null,
  selectedItems,
  toggleOpenedState = noop,
  withMultipleSelection = false,
}) {
  const [inputFilteredItems, setInputFilteredItems] = useState(items)
  const noSourceItems = items.length === 0
  const withCustomEmptyListItems =
    noSourceItems &&
    Array.isArray(customEmptyListItems) &&
    customEmptyListItems.length > 0
  const resultingItems = withCustomEmptyListItems
    ? customEmptyListItems
    : inputFilteredItems
  const inputEl = useRef(null)

  const {
    getComboboxProps,
    getInputProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    inputValue,
    setHighlightedIndex,
  } = useCombobox({
    initialInputValue: '',
    initialIsOpen: isOpen,
    isOpen,
    items: resultingItems,
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
      let filtered = items.filter(item =>
        itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase())
      )
      const isListEmpty = filtered.length === 0

      if (isListEmpty && Array.isArray(customEmptyListItems)) {
        const processed = customEmptyListItems.map(item => {
          if (isFunction(item.customizeLabel)) {
            item.label = item.customizeLabel(inputValue)
            item.inputValue = inputValue
          }

          return item
        })

        filtered = processed
      }

      setHighlightedIndex(filtered.findIndex(isItemHighlightable))
      setInputFilteredItems(filtered)
    },

    onIsOpenChange(changes) {
      onIsOpenChangeCommon({
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
        items: resultingItems,
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
    setInputFilteredItems(items)
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
      menuCSS={menuCSS}
      menuWidth={menuWidth}
      {...getComboboxProps()}
    >
      <InputSearchHolderUI hide={withCustomEmptyListItems || noSourceItems}>
        <input
          data-event-driver
          {...getInputProps({
            className: 'DropList__Combobox__input',
            ref: inputEl,
            onBlur: event => {
              onMenuBlur(event)
            },
            onChange: event => {
              onInputChange(event.target.value)
            },
            onFocus: event => {
              onMenuFocus(event)
            },
            onKeyDown: event => {
              if (event.key === 'Tab') {
                toggleOpenedState(false)
                onDropListLeave()
              } else if (event.key === 'Escape') {
                focusToggler()
              } else if (event.key === 'Enter') {
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
          placeholder={inputPlaceholder}
        />
      </InputSearchHolderUI>
      <MenuListUI
        className={`${DROPLIST_MENULIST} MenuList-Combobox`}
        {...getMenuProps()}
        aria-label={menuAriaLabel}
        aria-labelledby={null}
      >
        {renderListContents({
          customEmptyList,
          inputValue,
          items: resultingItems,
          renderListItem,
        })}
      </MenuListUI>
    </DropListWrapperUI>
  )
}

export default Combobox
