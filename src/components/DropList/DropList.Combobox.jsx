import React, { useState, useRef, useEffect } from 'react'
import { useCombobox } from 'downshift'
import useDeepCompareEffect from 'use-deep-compare-effect'
import isFunction from 'lodash.isfunction'
import isNil from 'lodash.isnil'
import {
  isItemAction,
  isItemADivider,
  isItemAGroupLabel,
  isItemHighlightable,
  isItemSelected,
  itemToString,
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

function noop() {}

function Combobox({
  clearOnSelect = false,
  closeOnSelection = true,
  customEmptyList = null,
  customEmptyListItems,
  'data-cy': dataCy = `DropList.${VARIANTS.COMBOBOX}`,
  deactivateInputFilterAction,
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
  const noSourceItems = items.length === 0
  const withCustomEmptyListItems =
    noSourceItems &&
    Array.isArray(customEmptyListItems) &&
    customEmptyListItems.length > 0
  const [inputFilteredItems, setInputFilteredItems] = useState(items)
  const actionItemRef = useRef(null)
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
    items: withCustomEmptyListItems ? customEmptyListItems : inputFilteredItems,
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
      if (deactivateInputFilterAction) return

      let filtered = filterItems(items, inputValue, actionItemRef)
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
      onInputChange(inputValue, filtered)
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
        items: withCustomEmptyListItems
          ? customEmptyListItems
          : inputFilteredItems,
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
    if (isNil(actionItemRef.current)) {
      const actionItem = items.find(item => isItemAction(item))

      // Store the original action item in a ref, we make sure to only do it once.
      // The `false` assignment here will make sure we don't enter this
      // `if` block again: `isNil(false) === false`
      actionItemRef.current = !isNil(actionItem) ? { ...actionItem } : false
    }
    setInputFilteredItems(items)
  }, [items])

  function renderListItem(item, index) {
    const itemProps = {
      highlightedIndex,
      index,
      inputValue,
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
            onFocus: event => {
              onMenuFocus(event)
            },
            onChange: event => {
              if (deactivateInputFilterAction) {
                event.persist()
                onInputChange(event.target.value, inputFilteredItems, event)
              }
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
          items: withCustomEmptyListItems
            ? customEmptyListItems
            : inputFilteredItems,
          renderListItem,
        })}
      </MenuListUI>
    </DropListWrapperUI>
  )
}

/**
 * Remove empty groups (normally after some filtering has been done), examples:
 * [group_label, item, group_label, item] => [group_label, item, group_label, item]
 * [group_label, item, group_label] => [group_label, item]
 * [group_label, group_label] => []
 * [group_label, divider] => []
 * [group_label, divider, action] => [action]
 *
 * @param {Array} items The items to process
 * @returns Array
 */
function removeEmptyGroups(items) {
  const copy = [].concat(items)
  const remove = []

  for (let index = 0; index < copy.length; index++) {
    const current = copy[index]
    const next = copy[index + 1]

    if (isItemAGroupLabel(current)) {
      if (isNil(next) || isItemAGroupLabel(next) || isItemADivider(next)) {
        remove.push(index)
      }
    }
  }

  return remove.length ? copy.filter((_, idx) => !remove.includes(idx)) : copy
}

/**
 * Remove the divider if the only other item left is an action item:
 * [dividerItem, actionItem] => [actionItem]
 * @param {Array} items The items to process
 * @returns Array
 */
function maybeRemoveActionDivider(items) {
  if (items.length === 2) {
    if (isItemADivider(items[0]) && isItemAction(items[1])) {
      return items.filter(item => !isItemADivider(item))
    }
  }

  return items
}

/**
 * Find the action item and restore it's label to the original one
 * @param {array} items List of items
 * @param {object} actionItemRef Ref that holds the original action item if it existed
 * @returns array
 */
function restoreActionItemLabel(items, actionItemRef) {
  if (actionItemRef.current === false) return items
  // Usually action items are the last in the array, let's try our luck to avoi traversing the whole array
  const last = items[items.length - 1]

  if (isItemAction(last)) {
    last.label = actionItemRef.current.label
  } else {
    // If it wasn't, traverse the array trying to find it
    const actionItemIndex = items.findIndex(item => isItemAction(item))

    if (actionItemIndex !== -1) {
      items[actionItemIndex].label = actionItemRef.current.label
    }
  }

  return items
}

/**
 * Filters items:
 * Keeps item if it's value starts with the value of `inputValue`
 * Keeps item if it's GROUP_LABEL, only if that group still has items left in the filtered array
 * Keeps item if it's ACTION
 * Keeps item if it's DIVIDER followed by ACTION and there are more items left in the filtered array
 * 
 * Plus:
 * ACTION item: if a `template` key is found, replace the "__inputValue__" substring found in it with `inputValue` 
 * and add a new key `inputValue` for easy retrieval
 
 * @param {Array} items The items to process
 * @param {string} inputValue The value to filter by
 * @returns Array
 */
export function filterItems(items, inputValue, actionItemRef) {
  let filtered = []
  let hasAction = false
  let hasGroups = false

  if (!inputValue) {
    return !isNil(actionItemRef.current) || actionItemRef.current === false
      ? restoreActionItemLabel(items, actionItemRef)
      : items
  }

  for (let index = 0; index < items.length; index++) {
    const item = items[index]

    if (isItemAction(item)) {
      hasAction = true
      filtered.push(item)

      if (item.template && inputValue) {
        item.label = item.template.replace('__inputValue__', inputValue)
        item.inputValue = inputValue
      }
    } else if (isItemAGroupLabel(item)) {
      hasGroups = true
      filtered.push(item)
    } else if (isItemADivider(item) && isItemAction(items[index + 1])) {
      filtered.push(item)
    } else if (
      inputValue &&
      itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase())
    ) {
      filtered.push(item)
    }
  }

  if (hasGroups) {
    filtered = removeEmptyGroups(filtered)
  }

  if (hasAction) {
    filtered = maybeRemoveActionDivider(filtered)
  }

  return filtered
}

export default Combobox
