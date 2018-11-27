import { isDefined } from '../../../utilities/is'

import {
  getItemFromCollection,
  incrementPathIndex,
  decrementPathIndex,
} from './Dropdown.utils'

import {
  findItemDOMNode,
  findClosestItemDOMNode,
  getIndexFromItemDOMNode,
  getValueFromItemDOMNode,
} from './Dropdown.renderUtils'

const initialItemState = {
  activeItem: null,
  activeIndex: null,
  activeValue: null,
  activeId: null,
  index: null,
  previousIndex: null,
  selectedIndex: '',
  previousSelectedIndex: '',
}

export const changeDirection = state => {
  return {
    ...state,
    direction: state.direction === 'right' ? 'left' : 'right',
  }
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

  return {
    ...state,
    ...initialItemState,
    isOpen: true,
  }
}

export const closeDropdown = state => {
  // Trigger callback from Provider
  state.onClose && state.onClose()

  return {
    ...state,
    ...initialItemState,
    isOpen: false,
  }
}

export const onMenuMounted = state => {
  return {
    ...state,
    isMounted: true,
  }
}

export const onMenuUnmounted = state => {
  return {
    ...state,
    isMounted: false,
  }
}

export const onSelect = (state, event) => {
  const { items, activeValue, onSelect } = state
  const item = getItemFromCollection(items, activeValue)

  // Guard state from being updated!
  if (!item) return
  if (item.disabled) return
  if (item.items) return

  // Trigger callback from Provider
  /* istanbul ignore else */
  if (item && onSelect) {
    onSelect(item.value, { event, item, dropdownType: 'hsds-dropdown-v2' })
  }

  if (state.closeOnSelect) {
    return closeDropdown(state)
  }
}

export const setTriggerNode = (state, triggerNode) => {
  return {
    ...state,
    triggerNode,
  }
}

export const setMenuNode = (state, menuNode) => {
  return {
    ...state,
    menuNode,
  }
}

export const incrementIndex = (state, modifier: number = 1) => {
  const { envNode, index, indexMap } = state
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

export const decrementIndex = (state, modifier: number = 1) => {
  const { envNode, index, indexMap } = state
  const nextIndex = decrementPathIndex(index, modifier)

  if (!indexMap[nextIndex]) return

  // This extra check is to support item filtering.
  // The next DOM node may not exist, depending on filtering results.
  const target = findItemDOMNode(nextIndex, envNode) as Element
  if (!target) return

  // @ts-ignore
  return focusItem(state, { target })
}

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

  return {
    previousIndex: state.index,
    index: index,
    lastInteractionType,
  }
}

export const selectItemFromIndex = (state: any) => {
  const target = findItemDOMNode(state.index, state.envNode)
  if (!target) return

  const mockEvent = { target }
  return selectItem(state, mockEvent)
}

export const selectItem = (state, event: any) => {
  const node = findClosestItemDOMNode(event.target)
  const index = getIndexFromItemDOMNode(node)
  const itemValue = getValueFromItemDOMNode(node)
  const item = getItemFromCollection(state.items, itemValue)

  // Performance guard to prevent store from updating
  if (!index) return
  if (!item) return
  if (item.disabled) return
  if (item.items) return

  // Trigger Callback
  if (item && state.onSelect) {
    state.onSelect(item.value, {
      event,
      item,
      dropdownType: 'hsds-dropdown-v2',
    })
  }

  const selectedItem = !state.clearOnSelect ? item : null

  return {
    isOpen: state.closeOnSelect ? false : state.isOpen,
    previousSelectedItem: state.selectedItem,
    previousSelectedIndex: state.selectedIndex,
    selectedIndex: index,
    selectedItem: selectedItem,
  }
}
