// Deprecated
/* istanbul ignore file */
import isNil from 'lodash.isnil'
import actionTypes from './Dropdown.actionTypes'
import {
  getItemFromCollection,
  incrementPathIndex,
  decrementPathIndex,
  getIndexMapFromItems,
  getSelectedItemIndex,
  itemIsActive,
  isSelectedItemEmpty,
  processSelectionOfItem,
} from './Dropdown.utils'

import {
  findItemDOMNode,
  findClosestItemDOMNode,
  getIndexFromItemDOMNode,
  getValueFromItemDOMNode,
  findTriggerNode,
} from './Dropdown.renderUtils'

import { dispatch } from './Dropdown.store'

import { focusWithoutScrolling } from '../../utilities/focus'

export const changeDirection = state => {
  return dispatch(state, {
    type: actionTypes.CHANGE_DIRECTION,
  })
}

export const toggleOpen = state => {
  if (state.isOpen) {
    return closeDropdown(state)
  } else {
    return openDropdown(state)
  }
}

export const openDropdown = state => {
  const { onOpen, isFocusSelectedItemOnOpen, isSelectFirstItemOnOpen } = state
  const selectedIndex = getSelectedItemIndex(state)
  const payload = {}

  // Trigger callback from Provider
  onOpen && state.onOpen()

  if (isSelectFirstItemOnOpen) {
    payload['index'] = '0'
  }

  if (isFocusSelectedItemOnOpen && selectedIndex) {
    payload['index'] = selectedIndex
  }

  return dispatch(state, {
    type: actionTypes.OPEN_DROPDOWN,
    payload,
  })
}

export const closeDropdown = state => {
  // Trigger callback from Provider
  state.onClose && state.onClose()

  return dispatch(state, {
    type: actionTypes.CLOSE_DROPDOWN,
  })
}

export const onMenuMounted = state => {
  // Trigger callback from Provider
  state.onMenuMount && state.onMenuMount()

  return dispatch(state, {
    type: actionTypes.MENU_MOUNT,
  })
}

export const onMenuUnmounted = state => {
  // Trigger callback from Provider
  state.onMenuUnmount && state.onMenuUnmount()

  return dispatch(state, {
    type: actionTypes.MENU_UNMOUNT,
  })
}

export const onMenuReposition = (state, position) => {
  return dispatch(state, {
    type: actionTypes.MENU_REPOSITION,
    payload: {
      position,
    },
  })
}

export const setTriggerNode = (state, triggerNode) => {
  return dispatch(state, {
    type: actionTypes.SET_TRIGGER_NODE,
    payload: {
      triggerNode,
    },
  })
}

export const setMenuNode = (state, menuNode) => {
  return dispatch(state, {
    type: actionTypes.SET_MENU_NODE,
    payload: {
      menuNode,
    },
  })
}

export const incrementIndex = (state, modifier = 1) => {
  const { envNode, index, indexMap, items, selectionClearer } = state

  if (!items.length) return

  let prevIndex = `${index ? index : -1}`
  let nextIndex = incrementPathIndex(prevIndex, modifier)
  const isLastItemWhenClearerPresent =
    selectionClearer != null && Number.parseInt(nextIndex) === items.length

  if (!indexMap[nextIndex] && !isLastItemWhenClearerPresent) return

  // This extra check is to support item filtering.
  // The next DOM node may not exist, depending on filtering results.
  const target = findItemDOMNode(nextIndex, envNode)
  if (!target) return

  return focusItem(state, { target })
}

export const decrementIndex = (state, modifier = 1) => {
  const { envNode, index, indexMap, items } = state
  if (!items.length || isNil(index)) return

  const nextIndex = decrementPathIndex(index, modifier)

  if (!indexMap[nextIndex]) return

  // This extra check is to support item filtering.
  // The next DOM node may not exist, depending on filtering results.
  const target = findItemDOMNode(nextIndex, envNode)
  if (!target) return

  return focusItem(state, { target })
}

export const focusItem = (state, event) => {
  const node = findClosestItemDOMNode(event.target)

  if (!node) return

  const index = getIndexFromItemDOMNode(node)
  // Performance guard to prevent store from uppdating
  if (state.index === index) return

  if (event && event.stopPropagation) {
    event.stopPropagation()
  }

  const isMouseEvent = !isNil(event.pageX)
  const lastInteractionType = isMouseEvent ? 'mouse' : 'keyboard'

  if (state.enableTabNavigation && !isMouseEvent) {
    node.focus()
  }

  return dispatch(state, {
    type: actionTypes.FOCUS_ITEM,
    payload: {
      index: index,
      lastInteractionType,
    },
  })
}

export const selectItemFromIndex = (state, event) => {
  const target = findItemDOMNode(state.index, state.envNode)
  if (!target) return

  if (
    state.allowMultipleSelection &&
    state.selectionClearer &&
    target.classList.contains('c-SelectionClearerItem')
  ) {
    return clearSelection(state, event)
  }

  return selectItem(state, event, target)
}

export const closeAndRefocusTriggerNode = state => {
  const { closeOnSelect, envNode, shouldRefocusOnClose } = state

  // Trigger close callback from Provider
  if (closeOnSelect && shouldRefocusOnClose(state)) {
    state.onClose && state.onClose()

    // Refocus triggerNode
    const triggerNode = findTriggerNode(envNode)
    focusWithoutScrolling(triggerNode)
  }
}

export const selectItem = (state, event, eventTarget) => {
  const {
    allowMultipleSelection,
    items,
    selectedItem: selectedItemsInState,
  } = state

  const node = eventTarget || findClosestItemDOMNode(event.target)
  const index = getIndexFromItemDOMNode(node)
  const itemValue = getValueFromItemDOMNode(node)
  const item = getItemFromCollection(items, itemValue)
  const maybeCallItemOnClick = () => {
    const isMouseEvent = !isNil(event.pageX)

    if (item && item.onClick && !isMouseEvent) {
      item.onClick(event)
    }
  }

  // Performance guard to prevent store from updating
  if (!index) return
  if (!item) return
  if (item.disabled) return
  if (item.items) return

  // This allows dropdown items to be clickable, but
  // not update the internal `selectedItem` state.
  if (item.preventSelect) {
    maybeCallItemOnClick()
    return updateOpen(state, false)
  }

  let selectedItem

  if (!state.clearOnSelect) {
    selectedItem = item
  } else {
    selectedItem = null
  }

  if (allowMultipleSelection) {
    selectedItem = processSelectionOfItem(selectedItemsInState, item)
  }

  // Trigger select callback
  if (item && state.onSelect) {
    const deselected =
      selectedItem == null
        ? undefined
        : itemIsActive(selectedItemsInState, item)

    state.onSelect(item.value, {
      event,
      item,
      selection: selectedItem,
      deselected,
      dropdownType: 'hsds-dropdown',
    })
  }

  maybeCallItemOnClick()
  closeAndRefocusTriggerNode(state)

  return dispatch(state, {
    type: actionTypes.SELECT_ITEM,
    payload: {
      selectedItem,
    },
  })
}

export const clearSelection = (state, event) => {
  const { selectedItem } = state

  // Performance guard to prevent store from updating

  if (isSelectedItemEmpty(selectedItem)) return

  // Trigger select callback
  if (state.onSelect) {
    const callbackProps = {
      event,
      item: '',
      dropdownType: 'hsds-dropdown',
    }

    state.onSelect('', callbackProps)
  }

  closeAndRefocusTriggerNode(state)

  return dispatch(state, {
    type: actionTypes.CLEAR_SELECTION,
    payload: {
      selectedItem: '',
    },
  })
}

export const updateSelectedItem = (state, selectedItem) => {
  return dispatch(state, {
    type: actionTypes.UPDATE_SELECTED_ITEM,
    payload: {
      selectedItem,
    },
  })
}

export const updateIndex = (state, index) => {
  return dispatch(state, {
    type: actionTypes.UPDATE_INDEX,
    payload: {
      index,
    },
  })
}

export const updateDropUp = (state, dropUp) => {
  return dispatch(state, {
    type: actionTypes.UPDATE_DROPUP,
    payload: {
      dropUp,
    },
  })
}

export const updateItems = (state, items) => {
  return dispatch(state, {
    type: actionTypes.UPDATE_ITEMS,
    payload: {
      items,
      indexMap: getIndexMapFromItems(items),
    },
  })
}

export const updateOpen = (state, isOpen) => {
  return dispatch(state, {
    type: actionTypes.UPDATE_OPEN,
    payload: {
      isOpen,
    },
  })
}

export const updateInputValue = (state, inputValue) => {
  return dispatch(state, {
    type: actionTypes.UPDATE_INPUT_VALUE,
    payload: {
      previousIndex: state.index,
      inputValue: inputValue,
      index: '0',
    },
  })
}
