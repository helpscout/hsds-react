import React, { useCallback, useState, useRef, useEffect } from 'react'
import { useCombobox, useMultipleSelection } from 'downshift'
import Tippy from '@tippyjs/react/headless'
import { noop } from '../../utilities/other'
import {
  items,
  MenuListUI,
  ListItemUI,
  DropListWrapperUI,
  InputSearchHolderUI,
} from './DropList.css'
import { Button, Select } from './DropList.triggers'
import Animate from '../Animate'

function DropListManager({ closeOnSelection = false, onSelect = noop }) {
  const [isDropdownOpen, setDropdownState] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')

  function openDropdwon(isOpen) {
    setDropdownState(isOpen)
  }

  const onSelectionChange = useCallback(changes => {
    console.log('changes', changes)
  }, [])

  return (
    <Tippy
      interactive={true}
      visible={isDropdownOpen}
      placement="bottom-start"
      onClickOutside={(instance, event) => {
        setDropdownState(false)
      }}
      onHidden={({ reference }) => {
        reference.focus()
      }}
      render={() => (
        <Animate
          animateOnMount={false}
          duration={200}
          easing="ease-in-out"
          in={isDropdownOpen}
          sequence="fade down"
          unmountOnExit={false}
        >
          <DropdownComboboxMultiple
            isDropdownOpen={isDropdownOpen}
            closeOnSelection={closeOnSelection}
            openDropdwon={openDropdwon}
            onSelectionChange={onSelectionChange}
          />
        </Animate>
      )}
    >
      <Button
        type="button"
        aria-label="toggle menu"
        onClick={() => {
          setDropdownState(!isDropdownOpen)
        }}
      >
        Mailbox
      </Button>
    </Tippy>
  )
}
/* <Select
  type="button"
  aria-label="toggle menu"
  onClick={() => {
    setDropdownState(!isDropdownOpen)
  }}
  text={selectedItem}
/> */

function DropdownComboboxMultiple({
  closeOnSelection,
  isDropdownOpen,
  onSelectionChange,
  openDropdwon,
}) {
  const [inputItems, setInputItems] = useState(items)
  const inputEl = useRef(null)
  const {
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection()

  const {
    highlightedIndex,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getMenuProps,
    selectItem,
    selectedItem,
    inputValue,
  } = useCombobox({
    initialIsOpen: isDropdownOpen,
    isOpen: isDropdownOpen,
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter(item =>
          item.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      )
    },
    onIsOpenChange: changes => {
      const { type } = changes

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          openDropdwon(!closeOnSelection)
          break

        case useCombobox.stateChangeTypes.InputKeyDownEscape:
          openDropdwon(false)
          break

        default:
          break
      }
    },

    onStateChange: changes => {
      const { type, selectedItem } = changes

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (selectedItem) {
            if (Array.isArray(selectedItems)) {
              if (selectedItems.length === 0) {
                addSelectedItem(selectedItem)
              } else {
                if (selectedItems.includes(selectedItem)) {
                  removeSelectedItem(selectedItem)
                } else {
                  addSelectedItem(selectedItem)
                }
              }
            }

            selectItem(null)
          }

          break
        default:
          break
      }
    },

    stateReducer: (state, actionAndChanges) => {
      const { type, changes } = actionAndChanges

      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          return {
            ...changes,
            highlightedIndex: 0,
          }

        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            inputValue: '',
          }
        default:
          return changes
      }
    },
  })

  useEffect(() => {
    isDropdownOpen && inputEl.current.focus()
  }, [isDropdownOpen])

  useEffect(() => {
    if (selectedItems.length > 0) {
      onSelectionChange(selectedItems)
    }
  }, [selectedItems, onSelectionChange])

  function isItemSelected(item) {
    return selectedItem === item || selectedItems.includes(item)
  }

  function renderListItem(item, index) {
    return (
      <ListItemUI
        highlighted={highlightedIndex === index}
        selected={isItemSelected(item)}
        key={`${item}${index}`}
        {...getItemProps({ item, index })}
      >
        {item}
      </ListItemUI>
    )
  }

  return (
    <DropListWrapperUI {...getComboboxProps()}>
      <InputSearchHolderUI>
        <input
          {...getInputProps(getDropdownProps({ ref: inputEl }))}
          placeholder="Search"
        />
      </InputSearchHolderUI>
      <MenuListUI {...getMenuProps()}>
        {inputItems.length > 0 ? (
          inputItems.map(renderListItem)
        ) : (
          <ListItemUI>No results for {inputValue}</ListItemUI>
        )}
      </MenuListUI>
    </DropListWrapperUI>
  )
}

function DropdownCombobox({
  closeOnSelection,
  isDropdownOpen,
  onSelectedItemChange,
  openDropdwon,
}) {
  const [inputItems, setInputItems] = useState(items)
  const inputEl = useRef(null)
  const {
    highlightedIndex,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getMenuProps,
    selectedItem,
    inputValue,
  } = useCombobox({
    initialIsOpen: isDropdownOpen,
    isOpen: isDropdownOpen,
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter(item =>
          item.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      )
    },
    onIsOpenChange: changes => {
      const { type } = changes

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          openDropdwon(!closeOnSelection)
          break

        case useCombobox.stateChangeTypes.InputKeyDownEscape:
          openDropdwon(false)
          break

        default:
          break
      }
    },

    onSelectedItemChange: ({ selectedItem }) => {
      onSelectedItemChange({ selectedItem })
    },

    stateReducer: (state, actionAndChanges) => {
      const { type, changes } = actionAndChanges

      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          return {
            ...changes,
            highlightedIndex: 0,
          }

        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            inputValue: '',
          }
        default:
          return changes
      }
    },
  })

  useEffect(() => {
    isDropdownOpen && inputEl.current.focus()
  }, [isDropdownOpen])

  return (
    <DropListWrapperUI {...getComboboxProps()}>
      <InputSearchHolderUI>
        <input {...getInputProps({ ref: inputEl })} placeholder="Search" />
      </InputSearchHolderUI>
      <MenuListUI {...getMenuProps()}>
        {inputItems.length > 0 ? (
          inputItems.map((item, index) => (
            <ListItemUI
              highlighted={highlightedIndex === index}
              selected={selectedItem === item}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </ListItemUI>
          ))
        ) : (
          <ListItemUI>No results for {inputValue}</ListItemUI>
        )}
      </MenuListUI>
    </DropListWrapperUI>
  )
}

export default DropListManager
