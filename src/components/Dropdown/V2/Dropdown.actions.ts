import { isDefined } from '../../../utilities/is'

import {
  SELECTORS,
  getItemFromCollection,
  pathResolve,
  findItemDOMNode,
  findClosestItemDOMNode,
  getIndexFromItemDOMNode,
  getValueFromItemDOMNode,
  incrementPathIndex,
  decrementPathIndex,
} from './Dropdown.utils'

const initialItemState = {
  activeItem: null,
  activeIndex: null,
  activeValue: null,
  activeId: null,
  index: null,
  previousIndex: null,
  selectedItem: null,
  selectedIndex: '',
  previousSelectedIndex: '',
}

export const setActiveItem = (state, activeItem) => {
  const { id } = state

  // Guard state from being updated!
  if (state.activeItem === activeItem) return

  const activeIndex = activeItem.getAttribute(SELECTORS.indexAttribute)
  const activeValue = activeItem.getAttribute(SELECTORS.valueAttribute)
  const activeId = id ? pathResolve(id, activeIndex) : null

  return {
    ...state,
    activeItem,
    activeIndex,
    activeValue,
    activeId,
  }
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
    isOpen: true,
    ...initialItemState,
  }
}

export const closeDropdown = state => {
  // Trigger callback from Provider
  state.onClose && state.onClose()

  return {
    ...state,
    isOpen: false,
    ...initialItemState,
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

export const setEventTargetAsActive = (state, event: Event) => {
  const node = event.currentTarget as HTMLElement
  if (node) {
    return setActiveItem(state, node)
  }
}

export const incrementIndex = (state, modifier: number = 1) => {
  const { index, indexMap } = state
  let prevIndex = index ? index : -1
  prevIndex = `${prevIndex}`
  const nextIndex = incrementPathIndex(prevIndex, modifier)

  if (!indexMap[nextIndex]) return

  return {
    previousIndex: index,
    index: nextIndex,
    lastInteractionType: 'keyboard',
  }
}

export const decrementIndex = (state, modifier: number = 1) => {
  const { index, indexMap } = state
  const nextIndex = decrementPathIndex(index, modifier)

  if (!indexMap[nextIndex]) return

  return {
    previousIndex: state.index,
    index: nextIndex,
    lastInteractionType: 'keyboard',
  }
}

export const itemOnMouseEnter = (state, event: MouseEvent) => {
  if (event && event.stopPropagation) {
    event.stopPropagation()
  }

  return setEventTargetAsActive(state, event)
}

export const itemOnFocus = (state, event: Event) => {
  if (event && event.stopPropagation) {
    event.stopPropagation()
  }

  return setEventTargetAsActive(state, event)
}

export const itemOnClick = (state, event: Event, props: any = {}) => {
  const { hasSubMenu } = props
  if (event && event.stopPropagation) {
    event.stopPropagation()
  }

  if (hasSubMenu) return

  return onSelect(state, event)
}

export const focusItem = (state, event: Event) => {
  const node = findClosestItemDOMNode(event.target)
  if (!node) return
  const index = getIndexFromItemDOMNode(node)
  // Performance guard to prevent store from uppdating
  if (state.index === index) return

  // @ts-ignore
  const isMouseEvent = isDefined(event.pageX)
  const lastInteractionType = isMouseEvent ? 'mouse' : 'keyboard'

  return {
    previousIndex: state.index,
    index: index,
    lastInteractionType,
  }
}

export const selectItemFromIndex = (state: any) => {
  const target = findItemDOMNode(state.index)
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
