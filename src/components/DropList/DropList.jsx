import React, { useCallback, useState, useRef, useEffect } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useCombobox, useMultipleSelection } from 'downshift'
import Tippy from '@tippyjs/react/headless'
import { isObject } from '../../utilities/is'
import { noop } from '../../utilities/other'
import {
  itemToString,
  isItemSelected,
  isSelectTypeToggler,
  useWarnings,
} from './DropList.utils'
import {
  ItemSpec,
  itemsWithDivider,
  groupedItems,
} from '../../utilities/specs/dropdown.specs'
import {
  MenuListUI,
  ListItemUI,
  DropListWrapperUI,
  InputSearchHolderUI,
} from './DropList.css'
import { Button, Select } from './DropList.togglers'
import Animate from '../Animate'

const regularItems = ItemSpec.generate(5)

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

  useWarnings({ toggler, withMultipleSelection })

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
        props.text = itemToString(selectedItem)
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
              isSelectTypeToggler(toggler) ? false : withMultipleSelection
            }
            isDropdownOpen={isDropdownOpen}
            items={regularItems}
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
  items,
}) {
  const [inputItems, setInputItems] = useState(items)
  const inputEl = useRef(null)

  /** ========== <DOWNSHIFT> ============= */
  const {
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection()
  const {
    getComboboxProps,
    getInputProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    inputValue,
    selectItem,
    selectedItem,
  } = useCombobox({
    initialIsOpen: isDropdownOpen,
    isOpen: isDropdownOpen,
    items: inputItems,
    itemToString,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter(item =>
          itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase())
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
          if (selectedItem && withMultipleSelection) {
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
  /** ========== </DOWNSHIFT> ============= */

  /** ========== <EFFECTS> ============= */
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
  /** ========== </EFFECTS> ============= */

  /** ========== <RENDER> ============= */
  function renderListItem(item, index) {
    if (isObject(item)) {
      const { id, label } = item
      const key = id || `${label}_${index}`

      return (
        <ListItemUI
          highlighted={highlightedIndex === index}
          selected={isItemSelected({ item, selectedItem, selectedItems })}
          key={key}
          {...getItemProps({ item, index })}
        >
          {item.label}
        </ListItemUI>
      )
    }
    return (
      <ListItemUI
        highlighted={highlightedIndex === index}
        selected={isItemSelected({ item, selectedItem, selectedItems })}
        key={`${item}_${index}`}
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
  /** ========== </RENDER> ============= */
}

export default DropListManager
