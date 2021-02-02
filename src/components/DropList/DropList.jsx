import React, { useCallback, useState, useRef, useEffect } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
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
import { Button, Select } from './DropList.togglers'
import { isSelectTypeToggler, displayWarnings } from './DropList.utils'
import Animate from '../Animate'

function DropListManager({
  closeOnSelection = false,
  withMultipleSelection = true,
  onSelect = noop,
  tippy = {},
  toggler = {},
  animate = {},
}) {
  const [isDropdownOpen, setDropdownState] = useState(false)
  const [selectedItem, setSelectedItems] = useState(null)

  const onSelectionChange = useCallback(
    selection => {
      onSelect(selection)
      setSelectedItems(selection)
    },
    [onSelect]
  )

  function openDropdwon(isOpen) {
    setDropdownState(isOpen)
  }

  displayWarnings({ toggler, withMultipleSelection })

  const tippyProps = {
    interactive: true,
    placement: 'bottom-start',
    ...tippy,
  }

  const animateProps = {
    animateOnMount: false,
    duration: 200,
    easing: 'ease-in-out',
    sequence: 'fade down',
    unmountOnExit: false,
    ...animate,
  }

  let Toggler

  if (React.isValidElement(toggler)) {
    const { onClick } = toggler.props
    const props = {
      onClick: () => {
        onClick && onClick()
        setDropdownState(!isDropdownOpen)
      },
    }

    if (toggler.type === Select) {
      const { text } = toggler.props

      if (text == null) {
        props.text = selectedItem
      }
    }

    Toggler = React.cloneElement(toggler, props)
  } else {
    Toggler = (
      <Button
        onClick={() => {
          setDropdownState(!isDropdownOpen)
        }}
        text="Fallback Toggler"
      />
    )
  }

  return (
    <Tippy
      {...tippyProps}
      visible={isDropdownOpen}
      onClickOutside={() => {
        setDropdownState(false)
      }}
      onHidden={({ reference }) => {
        reference.focus()
      }}
      render={() => (
        <Animate {...animateProps} in={isDropdownOpen}>
          <DropdownCombobox
            withMultipleSelection={
              isSelectTypeToggler() ? false : withMultipleSelection
            }
            isDropdownOpen={isDropdownOpen}
            closeOnSelection={closeOnSelection}
            openDropdwon={openDropdwon}
            onSelectionChange={onSelectionChange}
          />
        </Animate>
      )}
    >
      {Toggler}
    </Tippy>
  )
}
// <Button
//   onClick={() => {
//     setDropdownState(!isDropdownOpen)
//   }}
// >
// </Button>
/* <Select
  onClick={() => {
    setDropdownState(!isDropdownOpen)
  }}
  text={selectedItem}
/> */

function DropdownCombobox({
  closeOnSelection,
  isDropdownOpen,
  onSelectionChange = noop,
  openDropdwon,
  withMultipleSelection,
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
            if (withMultipleSelection) {
              if (selectedItems.length === 0) {
                addSelectedItem(selectedItem)
              } else {
                if (selectedItems.includes(selectedItem)) {
                  removeSelectedItem(selectedItem)
                } else {
                  addSelectedItem(selectedItem)
                }
              }
              selectItem(null)
            }
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

  useDeepCompareEffect(() => {
    if (withMultipleSelection && selectedItems.length > 0) {
      onSelectionChange(selectedItems)
    } else {
      selectedItem != null && onSelectionChange(selectedItem)
    }
  }, [withMultipleSelection, selectedItems, selectedItem, onSelectionChange])

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

export default DropListManager
