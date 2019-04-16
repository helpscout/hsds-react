import { isDefined } from '../../../utilities/is'
import actionTypes from './Dropdown.actionTypes'
import {
  getItemFromCollection,
  incrementPathIndex,
  decrementPathIndex,
  getIndexMapFromItems,
} from './Dropdown.utils'

import {
  findItemDOMNode,
  findClosestItemDOMNode,
  getIndexFromItemDOMNode,
  getValueFromItemDOMNode,
  findTriggerNode,
} from './Dropdown.renderUtils'
import { dispatch } from './Dropdown.store'

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
  // Trigger callback from Provider
  state.onOpen && state.onOpen()

  return dispatch(state, {
    type: actionTypes.OPEN_DROPDOWN,
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

/* istanbul ignore next */
export const incrementIndex = (state, modifier: number = 1) => {
  const { envNode, index, indexMap, items } = state
  if (!items.length) return

  let prevIndex = index ? index : -1
  prevIndex = `${prevIndex}`
  const nextIndex = incrementPathIndex(prevIndex, modifier)

  if (!indexMap[nextIndex]) return

  // This extra check is to support item filtering.
  // The next DOM node may not exist, depending on filtering results.
  const target = findItemDOMNode(nextIndex, envNode) as Element
  if (!target) return

  // @ts-ignore
  return focusItem(state, { target })
}

/* istanbul ignore next */
export const decrementIndex = (state, modifier: number = 1) => {
  const { envNode, index, indexMap, items } = state
  if (!items.length || !isDefined(index)) return

  const nextIndex = decrementPathIndex(index, modifier)

  if (!indexMap[nextIndex]) return

  // This extra check is to support item filtering.
  // The next DOM node may not exist, depending on filtering results.
  const target = findItemDOMNode(nextIndex, envNode) as Element
  if (!target) return

  // @ts-ignore
  return focusItem(state, { target })
}

/* istanbul ignore next */
export const focusItem = (state, event: Event) => {
  const node = findClosestItemDOMNode(event.target as Element)

  if (!node) return

  const index = getIndexFromItemDOMNode(node)
  // Performance guard to prevent store from uppdating
  if (state.index === index) return

  if (event && event.stopPropagation) {
    event.stopPropagation()
  }

  // @ts-ignore
  const isMouseEvent = isDefined(event.pageX)
  const lastInteractionType = isMouseEvent ? 'mouse' : 'keyboard'

  if (state.enableTabNavigation && !isMouseEvent) {
    // @ts-ignore
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

/* istanbul ignore next */
export const selectItemFromIndex = (state: any, event: any) => {
  const target = findItemDOMNode(state.index, state.envNode)
  if (!target) return

  return selectItem(state, event, target)
}

/* istanbul ignore next */
export const selectItem = (state, event: any, eventTarget?: any) => {
  const { closeOnSelect, items, envNode, withMultipleSelection } = state
  const node = eventTarget || findClosestItemDOMNode(event.target)
  const index = getIndexFromItemDOMNode(node)
  const itemValue = getValueFromItemDOMNode(node)
  const item = getItemFromCollection(items, itemValue)

  // Performance guard to prevent store from updating
  if (!index) return
  if (!item) return
  if (item.disabled) return
  if (item.items) return

  const triggerNode = findTriggerNode(envNode)
  const selectedItem =
    !state.clearOnSelect || withMultipleSelection ? item : null
  const isMouseEvent = isDefined(event.pageX)

  const callbackProps = {
    event,
    item,
    dropdownType: 'hsds-dropdown-v2',
  }

  // Trigger select callback
  if (item && state.onSelect) {
    state.onSelect(item.value, callbackProps)
  }

  // Trigger item.onClick callback
  if (item && item.onClick && !isMouseEvent) {
    item.onClick(event)
  }

  // Trigger close callback from Provider
  if (closeOnSelect) {
    state.onClose && state.onClose()
    // Refocus triggerNode
    // @ts-ignore
    triggerNode && triggerNode.focus()
  }

  return dispatch(state, {
    type: actionTypes.SELECT_ITEM,
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
